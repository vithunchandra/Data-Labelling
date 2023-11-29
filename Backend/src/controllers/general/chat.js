const { User, Task, Chat } = require("../../models");

const chat = async (req, res) => {
  const { task_id, text } = req.body;
  // fetch data
  const user_now = req.user;
  const user_id = user_now._id;

  const task_now = await Task.findById(task_id).exec();
  const requester_id = task_now.requester;

  let check_worker_now_exist = null;
  if (user_now.role == "worker") {
    check_worker_now_exist = task_now.worker.filter((item) => {
      console.log(item.user_id, user_id);
      if (String(item.user_id) == String(user_id)) {
        return true;
      }
      return false;
    });

    if (check_worker_now_exist.length == 0) {
      // worker not exist error
      return res.status(404).json({
        msg: "Unauthorized, Worker haven't take this task",
      });
    }
  } else if (user_now.role == "requester") {
    const { worker_id } = req.body;
    if (String(requester_id) != String(user_id)) {
      return res.status(403).json({
        msg: "Unauthorized, Not the one who create the task.",
      });
    }

    check_worker_now_exist = task_now.worker.filter((item) => {
      if (String(item.user_id) == String(worker_id)) {
        return true;
      }
      return false;
    });
    if (check_worker_now_exist.length == 0) {
      // worker not exist error
      return res.status(404).json({
        msg: "Target worker does not exist here",
      });
    }
  } else {
    return res.status(404).json({
      msg: "Role not found",
    });
  }

  const new_chat = {
    user: user_id,
    task_id: task_id,
    text_chat: text,
    timestamp: Date.now(),
    is_read: false,
  };

  const new_chat_db = await Chat.create(new_chat);

  const new_chat_history = [...check_worker_now_exist[0].chat, new_chat_db._id];

  if (user_now.role == "requester") {
    const { worker_id } = req.body;
    const new_worker_state = task_now.worker.map((item) => {
      if (String(item.user_id) == String(worker_id)) {
        item = {
          ...item._doc,
          chat: new_chat_history,
        };
      }

      return item;
    });

    const updated_task = await Task.findByIdAndUpdate(
      task_id,
      { worker: new_worker_state },
      {
        new: true,
      }
    ).exec();
  } else if (user_now.role == "worker") {
    const new_worker_state = task_now.worker.map((item) => {
      if (String(item.user_id) == String(user_id)) {
        item = {
          ...item._doc,
          chat: new_chat_history,
        };
      }

      return item;
    });

    const updated_task = await Task.findByIdAndUpdate(
      task_id,
      { worker: new_worker_state },
      {
        new: true,
      }
    ).exec();
  }

  return res.status(200).json({
    msg: "suceed!",
  });
};

module.exports = {
  chat,
};
