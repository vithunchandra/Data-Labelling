const { Data, Task, Task_Type, User } = require("../../models");

const create_data = async (req, res) => {
  const { requester_id, task_id, text } = req.body;

  if (!requester_id || !task_id || !text) {
    return res.status(400).json({
      message: "Please provide all required fields",
    });
  }

  const task_now = await Task.findById(task_id);
  if (!task_now) {
    return res.status(404).json({
      message: "Task Not Found",
    });
  }
  const task_type_now = await Task_Type.findById(task_now.task_type);
  const char_price = task_type_now.price;
  const price = char_price * text.length;

  const new_data = await Data.create({
    text: text,
    price: price,
    task: task_id,
    labels: [],
  });

  const updated_task = await Task.findByIdAndUpdate(task_id, {
    $push: { data: new_data._id },
  });

  return res.json(new_data);
};

const edit_data = async (req, res) => {
  const { data_id, text } = req.body;

  if (!data_id || !text) {
    return res.status(400).json({
      message: "Please provide all required fields",
    });
  }

  const data_now = await Data.findById(data_id);
  if (!data_now) {
    return res.status(404).json({
      message: "Data Not Found",
    });
  }

  ////////////////// CAREFUL!!! ////////////
  const price_char_now = data_now.price / data_now.text.length;
  const new_price = price_char_now * text.length;
  //////////////////////////////////////////

  const updated_data = await Data.findByIdAndUpdate(data_id, {
    text: text,
    price: new_price,
  });

  return res.status(200).json({
    msg: "Suceed!",
  });
};

const label_data = async (req, res) => {
  const { data_id, worker_id, text } = req.body;

  const user_now = await User.findById(worker_id);
  if (String(user_now.role).toLowerCase() != "worker") {
    return res.status(400).json({
      msg: "User Not Worker",
    });
  }

  const data_now = await Data.findById(data_id).exec();

  data_now.labels.push({
    worker: worker_id,
    answer: text,
  });
  // update data
  await Data.findByIdAndUpdate(data_id, data_now);

  const task_now = await Task.findById(data_now.task).exec();

  const check_worker_exist = task_now.worker.filter((item) => {
    if (item.user_id == worker_id) {
      return true;
    }
    return false;
  });

  if (check_worker_exist.length == 0) {
    const task_worker = [
      ...task_now.worker,
      {
        user_id: worker_id,
        chat: [],
      },
    ];
    await Task.findByIdAndUpdate(data_now.task, {
      worker: task_worker,
    });
  }

  return res.status(200).json({
    msg: "Suceed!",
  });
};

module.exports = {
  create_data,
  edit_data,
  label_data,
};
