const { Task, User } = require("../models");

const create_task = async (req, res) => {
  try {
    const user_now = await User.findById(req.body._id_requester).exec();
    const result = await Task.create({
      requester: req.body._id_requester,
      task_name: req.body.task_name,
      task_description: req.body.task_description,
      possible_label: req.body.possible_label,
    });
    return res.status(200).json({
      msg: "Create Task Suceed",
      data: result,
    });
  } catch {
    return res.status(404).json({
      msg: "User Not Found",
    });
  }
};

module.exports = {
  create_task,
};
