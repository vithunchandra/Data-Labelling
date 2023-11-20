const { User, Task_Type, Data } = require("../models");

const expand_task = async (all_task) => {
  if (all_task.length > 0) {
    all_task = await Promise.all(
      all_task.map(async (temp_task) => {
        let task = temp_task;
        const requester = await User.findById(task.requester).exec();
        const task_type = await Task_Type.findById(task.task_type).exec();
        const task_data = await Promise.all(
          task.data.map(async (datum_id) => {
            const temp_datum = await Data.findById(datum_id).exec();
            return temp_datum;
          })
        );

        const new_task = {
          ...task._doc,
          requester: requester,
          task_type: task_type,
          data: task_data,
        };

        return new_task;
      })
    );
    return all_task;
  } else {
    return [];
  }
};

module.exports = { expand_task };
