const { Data, Task, Task_Type, User } = require("../../models");
const { queryHuggingFaceSummary } = require("../../utils/helper_function");

const create_data_helper = async (task_now, text) => {
  const task_type_now = await Task_Type.findById(task_now.task_type);
  const char_price = task_type_now.price;

  if (String(task_type_now.name).toLowerCase() == "ai summary checking") {
    const summary_now = await queryHuggingFaceSummary(text);
    text = text + "\n\nSummary:" + summary_now[0]["generated_text"];
  }

  const price = char_price * text.length;

  const new_data = await Data.create({
    text: text,
    price: price,
    task: task_now._id,
    labels: [],
  });

  const updated_task = await Task.findByIdAndUpdate(task_now._id, {
    $push: { data: new_data._id },
  });

  return new_data;
};

const update_data_helper = async (data_now, text) => {
  const price_char_now = data_now.price / data_now.text.length;
  const new_price = price_char_now * text.length;
  //////////////////////////////////////////

  const task_now = await Task.findById(data_now.task);
  const task_type_now = await Task_Type.findById(task_now.task_type);

  if (String(task_type_now.name).toLowerCase() == "ai summary checking") {
    const summary_now = await queryHuggingFaceSummary(text);
    text = text + "\n\nSummary:" + summary_now[0]["generated_text"];
  }

  const updated_data = await Data.findByIdAndUpdate(
    data_now._id,
    {
      text: text,
      price: new_price,
    },
    { new: true }
  );

  return updated_data;
};

const delete_data_helper = async (data_now) => {
  // delete one data
  const task_now = await Task.findById(data_now.task);
  const new_task_data = task_now.data.filter((item) => {
    if (String(item) === String(data_now._id)) {
      return false;
    }
    return true;
  });

  const updated_task = await Task.findByIdAndUpdate(
    data_now.task,
    {
      data: new_task_data,
    },
    { new: true }
  );

  const deleted_data = await Data.findByIdAndDelete(data_now._id);

  return deleted_data;
};

const delete_data = async (req, res) => {
  let { data_id } = req.body;
  const requester_id = req.user._id;
  if (String(req.user.role) != "requester") {
    return res.status(403).json({
      message: "Data must be created by requester",
    });
  }

  // console.log(task_now.requester, requester_id);
  const data_now = await Data.findById(data_id);
  if (!data_now) {
    return res.status(404).json({
      message: "Data Not Found",
    });
  }

  const task_now = await Task.findById(data_now.task);
  if (String(task_now.requester) !== String(requester_id)) {
    return res.status(403).json({
      message: "Data must be created by the same requester who create the task",
    });
  }

  const deleted_data = await delete_data_helper(data_now);
  return res.status(200).json({
    msg: "Data deleted!",
    deleted_data,
  });
};

const bulk_delete_data = async (req, res) => {
  let { deleted_data_id } = req.body;
  if (deleted_data_id.length == 0) {
    return res.status(400).json({
      message: "Data must not be empty",
    });
  }

  const requester_id = req.user._id;
  if (String(req.user.role) != "requester") {
    return res.status(403).json({
      message: "Data must be created by requester",
    });
  }

  for (let i = 0; i < deleted_data_id.length; i++) {
    const data_now = await Data.findById(deleted_data_id[i]);
    if (!data_now) {
      return res.status(404).json({
        message: "Data Not Found",
      });
    }

    const task_now = await Task.findById(data_now.task);
    if (String(task_now.requester) !== String(requester_id)) {
      return res.status(403).json({
        message:
          "Data must be created by the same requester who create the task",
      });
    }

    // delete data_now
    await delete_data_helper(data_now);
  }

  return res.status(200).json({
    msg: "All data deleted!",
  });
};

const create_data = async (req, res) => {
  let { task_id, text } = req.body;
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

  const new_data = await create_data_helper(task_now, text);

  return res.json(new_data);
};

const create_bulk_data = async (req, res) => {
  let { task_id, data } = req.body;

  const requester_id = req.user._id;
  if (String(req.user.role) != "requester") {
    return res.status(403).json({
      message: "Data must be created by requester",
    });
  }

  if (!requester_id || !task_id || !data) {
    return res.status(400).json({
      message: "Please provide all required fields",
    });
  }

  if (data.length == 0) {
    return res.status(400).json({
      message: "Data must not be empty",
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

  for (let i = 0; i < data.length; i++) {
    // use helper to create data
    const new_data = await create_data_helper(task_now, data[i]);
  }

  return res.status(200).json({
    msg: "All data created sucesfully!",
  });
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
  // use helper to update data
  const updated_data = await update_data_helper(data_now, text);

  return res.status(200).json({
    msg: "Suceed!",
  });
};

const bulk_edit_data = async (req, res) => {
  const { new_data } = req.body;
  if (!new_data) {
    return res.status(400).json({
      message: "Please provide all required fields",
    });
  }

  for (let i = 0; i < new_data.length; i++) {
    const data_now = await Data.findById(new_data[i].data_id);
    if (!data_now) {
      return res.status(404).json({
        message: "Data Not Found",
      });
    }
    // use helper to update data
    const updated_data = await update_data_helper(data_now, new_data[i].text);
  }

  return res.status(200).json({
    msg: "All data edited Suceesfully!",
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
  if (!data_now) {
    return res.status(404).json({
      msg: "Data Not Found",
    });
  }

  const task_now = await Task.findById(data_now.task).exec();
  const task_type = await Task_Type.findById(task_now.task_type).exec();

  if (String(task_type.name).toLowerCase() == "classification") {
    const possible_label = task_now.possible_label;
    const check_label_exist = possible_label.filter((item) => {
      if (String(item) == String(text)) {
        return true;
      }
      return false;
    });
    if (check_label_exist.length == 0) {
      return res.status(400).json({
        msg: "Label must be in possible label",
      });
    }
  }

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

  // check if user already label this data
  const check_user_already_label = data_now.labels.filter((item) => {
    if (String(item.worker) == String(worker_id)) {
      return true;
    }
    return false;
  });
  if (check_user_already_label.length > 0) {
    return res.status(400).json({
      msg: "User already label this data",
    });
  }

  // check if user is on ban_list of this task
  const check_user_on_ban_list = task_now.ban_list.filter((item) => {
    if (String(item) == String(worker_id)) {
      return true;
    }
    return false;
  });
  if (check_user_on_ban_list.length > 0) {
    return res.status(403).json({
      msg: "Worker is banned from this task",
    });
  }

  // update data
  const new_data = await Data.findByIdAndUpdate(data_id, data_now, {
    new: true,
  });

  return res.status(200).json({
    msg: "Suceed!",
    new_data,
  });
};

module.exports = {
  create_data,
  edit_data,
  label_data,
  create_bulk_data,
  bulk_edit_data,
  delete_data,
  bulk_delete_data,
};
