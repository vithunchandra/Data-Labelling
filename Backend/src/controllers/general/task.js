const { default: mongoose } = require("mongoose");
const { Task, User, Task_Type } = require("../../models");
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
      from: "User",
      localField: "task_type",
      foreignField: "_id",
      as: "task_type",
    },
  },
  {
    $lookup: {
      from: "Task_Type",
      localField: "ban_list",
      foreignField: "_id",
      as: "ban_list",
    },
  },
];

const create_task = async (req, res) => {
  let {
    task_name,
    task_description,
    possible_label,
    start_date,
    end_date,
    _id_requester,
    _id_task_type,
  } = req.body;

  if (!task_name || task_name == "") {
    return res.status(400).json({
      msg: "Task name must not be empty",
    });
  }

  const user_now = await User.findById(_id_requester).exec();
  const task_type = await Task_Type.findById(_id_task_type).exec();
  if (!user_now) {
    return res.status(404).json({
      msg: "User Not Found",
    });
  }
  if (!task_type) {
    return res.status(404).json({
      msg: "Task Type Not Found",
    });
  }

  if (String(task_type.name).toLowerCase() != "classification") {
    possible_label = [];
  } else {
    if (!possible_label) {
      return res.status(400).json({
        msg: "Task Type must not be empty",
      });
    } else {
      if (possible_label.length == 0) {
        return res.status(400).json({
          msg: "Task Type must not be empty",
        });
      }
    }
  }

  if (!start_date) {
    start_date = Date.now();
  }

  const result = await Task.create({
    task_name: task_name,
    task_description: task_description,
    possible_label: possible_label,
    start_date: start_date,
    end_date: end_date,
    requester: _id_requester,
    task_type: _id_task_type,
    data: [],
    ban_list: [],
    worker: [],
  });

  const user_task_now = [...user_now.tasks, result._id];
  user_now["tasks"] = user_task_now;
  await User.findByIdAndUpdate(user_now._id, user_now);

  return res.status(200).json({
    msg: "Create Task Suceed",
    data: result,
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

const get_user_task = async (req, res) => {
  //using model way
  const { expand, task_type_id } = req.query;
  const { user_id } = req.params;

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
          username: 1,
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

module.exports = {
  create_task,
  get_task,
  get_user_task,
};
