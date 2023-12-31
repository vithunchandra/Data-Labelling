const { Task_Type } = require("../../models");

const get_all_task_type = async (req, res) => {
  const all_task_type = await Task_Type.find({}).exec();
  return res.status(200).json(all_task_type);
};

const create_task_type = async (req, res) => {
  const { name } = req.body;

  const check_exist = await Task_Type.findOne({ name: name });
  if (check_exist) {
    return res.status(400).json({
      msg: "Task Type Exist",
    });
  }

  Task_Type.create(req.body);

  return res.status(200).json({
    msg: "succeed",
  });
};

const edit_task_type = async (req, res) => {
  const { name, price } = req.body;

  const check_exist = await Task_Type.findOne({ name: name });

  if (!check_exist) {
    return res.status(400).json({
      msg: "Task Type Doesn't Exist",
    });
  }

  try {
    check_exist.price = price;
    await check_exist.save();
  } catch (e) {
    return res.status(400).json({ msg: e });
  }

  return res.status(200).json({
    msg: "succeed",
  });
};

module.exports = {
  create_task_type,
  get_all_task_type,
  edit_task_type,
};
