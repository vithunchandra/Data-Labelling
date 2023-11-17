const { User, Task_Type } = require("../models");

const expand_task = async (all_task) => {
  if (all_task.length > 0) {
    all_task = await Promise.all(
      all_task.map(async (task) => {
        task.requester = await User.findById(task.requester).exec();
        task.task_type = await Task_Type.findById(task.task_type).exec();

        return task;
      })
    );
    return all_task;
  } else {
    return [];
  }
};

module.exports = { expand_task };
