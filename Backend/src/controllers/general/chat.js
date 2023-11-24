const { User, Task, Chat } = require("../../models");

const chat = async (req, res) => {
  const { task_id, user_id, text } = req.body;
  // fetch data

  const task_now = await Task.findById(task_id).exec();
  const requester_id = task_now.requester;
  const check_worker_now_exist = task_now.worker.filter((item) => {
    if (item.user_id == user_id) {
      return true;
    }
    return false;
  });
  if (check_worker_now_exist.length == 0) {
    // worker not exist error
    return res.status(404).json({
      msg: "Worker Not Found",
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

  const new_worker_state = task_now.worker.map((item) => {
    if (item.user_id == user_id) {
      return {
        user_id: user_id,
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

  return res.status(200).json({
    msg: "suceed!",
  });
};

module.exports = {
  chat,
};
