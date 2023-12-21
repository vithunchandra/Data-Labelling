const { default: mongoose } = require("mongoose");
const { Task, User, Task_Type, Chat } = require("../../models");
const { expand_task } = require("../../utils/helper_function");

const expand_task_aggregation_condition = [
  {
    $lookup: {
      from: "Data",
      localField: "data",
      foreignField: "_id",
      as: "data",
    },
  },
  {
    $lookup: {
      from: "User",
      localField: "requester",
      foreignField: "_id",
      as: "requester",
    },
  },
  {
    $lookup: {
      from: "Task_Type",
      localField: "task_type",
      foreignField: "_id",
      as: "task_type",
    },
  },
  {
    $lookup: {
      from: "User",
      localField: "ban_list",
      foreignField: "_id",
      as: "ban_list",
    },
  },
];

const toggle_task = async (req, res) => {
  let { task_id } = req.body;

  if (!task_id || task_id == "") {
    return res.status(400).json({
      msg: "Task id must not be empty",
    });
  }

  const user_now = req.user;
  const requester_id = new mongoose.Types.ObjectId(user_now._id);
  if (String(user_now.role).toLowerCase() != "requester") {
    return res.status(400).json({
      msg: "User Not Requester",
    });
  }

  let task = await Task.findById(task_id).exec();
  if (!task) {
    return res.status(404).json({
      msg: "Task Not Found",
    });
  }

  // update status
  let new_task = await Task.findByIdAndUpdate(
    task_id,
    {
      active: !task.active,
    },
    {
      new: true,
    }
  );

  return res.status(200).json(new_task);
};

const create_task = async (req, res) => {
  let {
    task_name,
    task_description,
    possible_label,
    start_date,
    end_date,
    min_credibility,
    task_type_id,
  } = req.body;

  if (!task_name || task_name == "") {
    return res.status(400).json({
      msg: "Task name must not be empty",
    });
  }

  const user_now = req.user;
  const requester_id = new mongoose.Types.ObjectId(user_now._id);
  if (String(user_now.role).toLowerCase() != "requester") {
    return res.status(400).json({
      msg: "User Not Requester",
    });
  }

  if (!min_credibility) {
    min_credibility = 0;
  }

  const task_type = await Task_Type.findById(task_type_id).exec();
  if (!task_type) {
    return res.status(404).json({
      msg: "Task Type Not Found",
    });
  }

  // task type checking
  if (String(task_type.name).toLowerCase() != "classification") {
    possible_label = [];
  } else {
    if (!possible_label) {
      return res.status(400).json({
        msg: "Possible label must not be empty",
      });
    } else {
      if (possible_label.length == 0) {
        return res.status(400).json({
          msg: "Possible label must not be empty",
        });
      }
    }
  }

  // date format is YYYY-MM-DD
  if (!start_date) {
    start_date = Date.now();
  } else {
    start_date = new Date(start_date).getTime();
  }
  if (!end_date || end_date == "") {
    return res.status(400).json({
      msg: "End date must not be empty",
    });
  }
  end_date = new Date(end_date).getTime();
  if (start_date > end_date) {
    return res.status(400).json({
      msg: "Start date must be before end date",
    });
  }

  const param_now = {
    task_name: task_name,
    task_description: task_description,
    possible_label: possible_label,
    start_date: start_date,
    end_date: end_date,
    active: true,
    min_credibility: min_credibility,
    requester: requester_id,
    task_type: task_type_id,
    data: [],
    ban_list: [],
    worker: [],
  };

  const result = await Task.create(param_now);

  const user_task_now = [...user_now.tasks, result._id];
  user_now["tasks"] = user_task_now;
  await User.findByIdAndUpdate(user_now._id, user_now);

  return res.status(200).json({
    msg: "Create Task Suceed",
    data: result,
  });
};

const edit_task = async (req, res) => {
  let {
    task_id,
    task_name,
    task_description,
    possible_label,
    start_date,
    end_date,
    min_credibility,
  } = req.body;

  if (!task_id || task_id == "") {
    return res.status(400).json({
      msg: "Task id must not be empty",
    });
  }

  const user_now = req.user;
  const requester_id = new mongoose.Types.ObjectId(user_now._id);
  if (String(user_now.role).toLowerCase() != "requester") {
    return res.status(400).json({
      msg: "User Not Requester",
    });
  }

  let task = await Task.findById(task_id).exec();
  if (!task) {
    return res.status(404).json({
      msg: "Task Not Found",
    });
  }

  if (!task_name || task_name == "") {
    return res.status(400).json({
      msg: "Task name must not be empty",
    });
  }

  // task type checking
  const task_type = await Task_Type.findById(task.task_type).exec();
  if (String(task_type.name).toLowerCase() != "classification") {
    possible_label = [];
  } else {
    if (!possible_label) {
      return res.status(400).json({
        msg: "Possible label must not be empty",
      });
    } else {
      if (possible_label.length == 0) {
        return res.status(400).json({
          msg: "Possible label must not be empty",
        });
      }
    }
  }

  // date format is YYYY-MM-DD
  if (!start_date) {
    start_date = Date.now();
  } else {
    start_date = new Date(start_date).getTime();
  }
  if (!end_date || end_date == "") {
    return res.status(400).json({
      msg: "End date must not be empty",
    });
  }
  end_date = new Date(end_date).getTime();
  if (start_date > end_date) {
    return res.status(400).json({
      msg: "Start date must be before end date",
    });
  }

  const param_now = {
    task_name: task_name,
    task_description: task_description,
    possible_label: possible_label,
    start_date: start_date,
    end_date: end_date,
    min_credibility: min_credibility,
  };

  const new_task = await Task.findByIdAndUpdate(task_id, param_now, {
    new: true,
  });

  return res.status(200).json({
    msg: "Edit Suceed!",
    new_task,
  });
};

const get_task = async (req, res) => {
  const { expand, task_type_id } = req.query;
  let condition_now = [
    { $addFields: { newField: 1 } },
    { $project: { newField: 0 } },
  ];

  if (task_type_id) {
    // add task_type filter to condition now
    condition_now = [
      ...condition_now,
      { $match: { task_type: new mongoose.Types.ObjectId(task_type_id) } },
    ];
  }

  if (expand) {
    if (expand == "1" || expand == "true" || expand == 1) {
      condition_now = [...condition_now, ...expand_task_aggregation_condition];
    }
  }

  const all_task = await Task.aggregate(condition_now).exec();

  return res.status(200).json(all_task);
};

const get_task_by_id = async (req, res) => {
  const { task_id } = req.params;
  const { expand } = req.query;

  let condition_now = [
    { $addFields: { newField: 1 } },
    { $project: { newField: 0 } },
  ];

  condition_now = [
    ...condition_now,
    { $match: { _id: new mongoose.Types.ObjectId(task_id) } },
  ];

  if (expand) {
    if (expand == "1" || expand == "true" || expand == 1) {
      condition_now = [...condition_now, ...expand_task_aggregation_condition];
    }
  }

  let all_task = await Task.aggregate(condition_now).exec();

  if (expand) {
    all_task = await Promise.all(
      all_task.map(async (item) => {
        item.data = await Promise.all(
          item.data.map(async (data_temp) => {
            const new_labels = await Promise.all(
              data_temp.labels.map(async (label_temp) => {
                label_temp.worker = await User.findById(label_temp.worker);
                return label_temp;
              })
            );
            data_temp.labels = new_labels;
            return data_temp;
          })
        );

        item.worker = await Promise.all(
          item.worker.map(async (worker_temp) => {
            const temp_worker = await User.findById(worker_temp.user_id);
            const chat_now = await Promise.all(
              worker_temp.chat.map(async (chat_id) => {
                return await Chat.findById(chat_id);
              })
            );

            return {
              user: temp_worker,
              chat: chat_now,
            };
          })
        );

        return item;
      })
    );
  }

  return res.status(200).json(all_task);
};

const get_user_task = async (req, res) => {
  //using model way
  const { expand, task_type_id } = req.query;
  const user_id = req.user._id;

  let condition_now = [
    { $match: { _id: new mongoose.Types.ObjectId(user_id) } },
    { $project: { password: 0 } },
    {
      $lookup: {
        from: "Task",
        localField: "tasks",
        foreignField: "_id",
        as: "tasks",
      },
    },
  ];

  if (task_type_id) {
    condition_now = [
      ...condition_now,
      {
        $project: {
          email: 1,
          name: 1,
          role: 1,
          credibility: 1,
          wallet: 1,
          tasks: {
            $filter: {
              input: "$tasks",
              cond: {
                $eq: [
                  "$$tasks.task_type",
                  new mongoose.Types.ObjectId(task_type_id),
                ],
              },
              as: "tasks",
            },
          },
        },
      },
    ];
  }

  condition_now = [
    ...condition_now,
    {
      $project: { tasks: 1 },
    },
    {
      $unwind: "$tasks",
    },
    {
      $replaceRoot: { newRoot: "$tasks" },
    },
  ];

  if (expand) {
    if (expand == "1" || expand == "true" || expand == 1) {
      condition_now = [...condition_now, ...expand_task_aggregation_condition];
    }
  }

  const all_task = await User.aggregate(condition_now).exec();

  return res.status(200).json(all_task);
};

const take_task = async (req, res) => {
  const { task_id } = req.body;
  const user_id = req.user._id;
  const user_now = req.user;

  if (user_now.role != "worker") {
    return res.status(403).json({
      message: "role must be worker",
    });
  }

  let user_task = user_now.tasks;
  const check_exist = user_task.filter((item) => {
    if (item == task_id) {
      return true;
    }
    return false;
  });

  if (check_exist.length > 0) {
    return res.status(400).json({
      msg: "User already take the task",
    });
  }

  user_task = [...user_task, task_id];

  const new_user = await User.findByIdAndUpdate(user_id, { tasks: user_task });

  const task_now = await Task.findById(task_id).exec();

  const check_worker_exist = task_now.worker.filter((item) => {
    if (item.user_id == user_id) {
      return true;
    }
    return false;
  });

  if (check_worker_exist.length == 0) {
    const task_worker = [
      ...task_now.worker,
      {
        user_id: user_id,
        chat: [],
      },
    ];
    await Task.findByIdAndUpdate(task_id, {
      worker: task_worker,
    });
  }

  return res.status(200).json({
    msg: "Suceed",
  });
};

const toggle_ban_user = async (req, res) => {
  const { task_id, banned_worker_id } = req.body;
  const user_now = req.user;
  const banned_worker = await User.findById(banned_worker_id);

  const task_now = await Task.findById(task_id).exec();
  if (!task_now) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  if (String(task_now.requester) != user_now._id) {
    return res.status(403).json({
      message: "You are not the requester of this task",
    });
  }

  const user_in_task_list = task_now.worker;
  user_in_task_list.filter((item) => {
    if (String(item.user_id) == String(banned_worker_id)) {
      return true;
    }
    return false;
  });
  if (user_in_task_list.length == 0) {
    return res.status(404).json({
      message: "Worker not found in this task",
    });
  }

  let updated_task;
  let user_in_banned_list = task_now.ban_list;
  user_in_banned_list = user_in_banned_list.filter((item) => {
    console.log(
      String(item),
      String(banned_worker_id),
      String(item) == String(banned_worker_id)
    );

    if (String(item) === String(banned_worker_id)) {
      return true;
    } else {
      return false;
    }
  });

  if (user_in_banned_list.length > 0) {
    // increment credibility by 10

    await User.findByIdAndUpdate(banned_worker_id, {
      credibility: Math.min(banned_worker.credibility + 10, 100),
    });

    updated_task = await Task.findByIdAndUpdate(
      task_id,
      {
        // remove banned user id from task ban_list
        $pull: { ban_list: banned_worker_id },
        // update isBanned from worker
      },
      { new: true }
    );
  } else {
    // decrement credibility by 10
    await User.findByIdAndUpdate(banned_worker_id, {
      credibility: Math.max(banned_worker.credibility - 10, 0),
    });

    updated_task = await Task.findByIdAndUpdate(
      task_id,
      {
        // add banned user id to task ban_list
        $push: { ban_list: banned_worker_id },
      },
      { new: true }
    );
  }
  updated_task["worker"] = undefined;

  return res.status(200).json({
    msg: "Suceed",
    updated_task,
  });
};

module.exports = {
  create_task,
  get_task,
  get_user_task,
  take_task,
  get_task_by_id,
  toggle_task,
  edit_task,
  toggle_ban_user,
};
