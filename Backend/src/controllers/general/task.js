const { Task, User, Task_Type } = require("../../models");
const { expand_task } = require("../../utils/helper_function");

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

  let use_search = false;
  if (task_type_id) {
    use_search = true;
    try {
      all_task = await Task.find({ task_type: task_type_id }).exec();
    } catch {
      all_task = [];
    }
  }

  if (!use_search) {
    all_task = await Task.find().exec();
  }

  if (expand) {
    if (
      String(expand).toLowerCase() == "true" ||
      expand == "1" ||
      expand == 1 ||
      expand == true
    )
      all_task = await expand_task(all_task);
  }

  return res.json(all_task);
};

const get_user_task = async (req, res) => {
  const { expand, task_type_id } = req.query;
  const { user_id } = req.params;

  const user_now = await User.findById(user_id).exec();
  if (!user_now) {
    return res.status(404).json({
      msg: "User Not Found",
    });
  }
  let all_task = await Promise.all(
    user_now.tasks.map(async (task_id) => {
      const task_now = await Task.findById(task_id);
      return task_now;
    })
  );

  if (task_type_id) {
    if (all_task.length > 0) {
      all_task = all_task.filter((task) => {
        if (task.task_type == task_type_id) {
          return true;
        }
        return false;
      });
    }
  }

  if (expand) {
    if (
      String(expand).toLowerCase() == "true" ||
      expand == "1" ||
      expand == 1 ||
      expand == true
    )
      all_task = await expand_task(all_task);
  }

  return res.json(all_task);
};

module.exports = {
  create_task,
  get_task,
  get_user_task,
};
