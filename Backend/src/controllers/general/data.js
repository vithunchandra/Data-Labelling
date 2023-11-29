const { Data, Task, Task_Type, User } = require("../../models");

const create_data = async (req, res) => {
  const { task_id, text } = req.body;
  const requester_id = req.user._id;
  if (String(req.user.role) != "requester") {
    return res.status(403).json({
      message: "Data must be created by requester",
    });
  }

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

  // console.log(task_now.requester, requester_id);
  if (String(task_now.requester) !== String(requester_id)) {
    return res.status(403).json({
      message: "Data must be created by the same requester who create the task",
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
  const { data_id, text } = req.body;

  const user_now = req.user;
  if (String(user_now.role).toLowerCase() != "worker") {
    return res.status(400).json({
      msg: "User Not Worker",
    });
  }
  const worker_id = user_now._id;

  const data_now = await Data.findById(data_id).exec();
  const task_now = await Task.findById(data_now.task).exec();
  const check_worker_exist = task_now.worker.filter((item) => {
    if (String(item.user_id) == String(worker_id)) {
      return true;
    }
    return false;
  });

  // console.log(task_now.worker);
  if (check_worker_exist.length == 0) {
    return res.status(403).json({
      msg: "Worker must take the task first",
    });
  }

  data_now.labels.push({
    worker: worker_id,
    answer: text,
  });
  // update data
  await Data.findByIdAndUpdate(data_id, data_now);

  // const task_now = await Task.findById(data_now.task).exec();

  // const check_worker_exist = task_now.worker.filter((item) => {
  //   if (item.user_id == worker_id) {
  //     return true;
  //   }
  //   return false;
  // });

  // if (check_worker_exist.length == 0) {
  //   const task_worker = [
  //     ...task_now.worker,
  //     {
  //       user_id: worker_id,
  //       chat: [],
  //     },
  //   ];
  //   await Task.findByIdAndUpdate(data_now.task, {
  //     worker: task_worker,
  //   });
  // }

  // insert task to user
  // const worker_now = User.findById(worker_id)
  // const task_exist_in_worker = worker_now.tasks.filter((item) => {
  //   if(item._id == data_now.task) {

  //   }
  // })

  return res.status(200).json({
    msg: "Suceed!",
  });
};

module.exports = {
  create_data,
  edit_data,
  label_data,
};
