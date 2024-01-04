const db = require("../models");

const taskStats = async ({ user_id }) => {
  let tasks = await db.Task.find({
    worker: {
      $elemMatch: {
        user_id,
      },
    },
  }).populate("data");

  const finishedTasks = tasks.filter((task) => {
    if (task.data.length <= 0) {
      return false;
    }
    for (const data of task.data) {
      let isExist = false;
      for (const label of data.labels) {
        if (user_id.equals(label.worker) && label.answer) {
          isExist = true;
        }
      }
      if (!isExist) {
        return false;
      }
    }

    return true;
  }).length;

  const unfinishedTasks = tasks.length - finishedTasks;

  return {
    totalTasks: tasks.length,
    totalFinishedTasks: finishedTasks,
    totalUnfinishedTasks: unfinishedTasks,
  };
};

const getLastChats = async ({ user_id }) => {
  const tasks = await db.Task.find(
    {
      worker: {
        $elemMatch: {
          user_id,
        },
      },
    },
    { _id: 1 }
  );
  const tasksId = tasks.map((item) => item._id);

  const chats = await db.Chat.find(
    {
      task_id: {
        $in: tasksId,
      },
      is_read: false,
      user: {
        $ne: user_id,
      },
      targetUser: user_id,
    },
    {},
    {
      sort: {
        timestamp: -1,
      },
      limit: 5,
    }
  ).populate("user");

  return chats;
};

const getMarketTasks = async ({ user_id, skip, type, startDate, name }) => {
  const filter = {};
  if (startDate) {
    filter.start_date = {
      $gte: new Date(startDate),
    };
  }
  if (name) {
    filter.task_name = { $regex: name, $options: "i" };
  }

  let tasks = await db.Task.find(
    {
      worker: {
        $not: {
          $elemMatch: { user_id },
        },
      },
      ban_list: { $nin: [user_id] },
      ...filter,
    },
    {
      worker: 0,
      ban_list: 0,
    },
    {
      skip,
      sort: {
        _id: 1,
      },
    }
  )
    .populate("requester")
    .populate("task_type");

  if (type) {
    tasks = tasks.filter((task) => task.task_type.name === type);
  }

  tasks = tasks.splice(0, 10);

  return tasks;
};

const getMarketTasksCount = async ({ user_id, type, startDate, name }) => {
  const filter = {};
  if (startDate) {
    filter.start_date = {
      $gte: new Date(startDate),
    };
  }
  if (name) {
    filter.task_name = { $regex: name, $options: "i" };
  }

  let tasks = await db.Task.find({
    worker: {
      $not: {
        $elemMatch: {
          user_id,
        },
      },
    },
    ban_list: {
      $nin: [user_id],
    },
    ...filter,
  }).populate("task_type");

  if (type) {
    tasks = tasks.filter((task) => task.task_type.name === type);
  }

  return tasks.length;
};

const getMarketTask = async ({ task_id, user_id }) => {
  const task = await db.Task.findOne(
    {
      _id: task_id,
      worker: {
        $not: {
          $elemMatch: {
            user_id,
          },
        },
      },
      ban_list: {
        $nin: [user_id],
      },
    },
    {
      ban_list: 0,
    },
    {
      sort: { _id: 1 },
    }
  )
    .populate("requester")
    .populate("task_type");

  return task;
};

const getNearMarketTask = async ({ task_id, user_id, direction }) => {
  let comparator = "$lt";
  let sort = -1;

  if (direction === "next") {
    comparator = "$gt";
    sort = 1;
  }
  const task = await db.Task.findOne(
    {
      _id: { [comparator]: task_id },
      worker: {
        $not: {
          $elemMatch: {
            user_id,
          },
        },
      },
      ban_list: {
        $nin: [user_id],
      },
    },
    {
      worker: 0,
      ban_list: 0,
    },
    {
      sort: { _id: sort },
      limit: 1,
    }
  )
    .populate("requester")
    .populate("task_type");

  return task;
};

const getUserTasks = async ({ user_id, skip, type, startDate, name }) => {
  const filter = {};
  if (startDate) {
    filter.start_date = {
      $gte: new Date(startDate),
    };
  }
  if (name) {
    filter.task_name = { $regex: name, $options: "i" };
  }

  let tasks = await db.Task.find(
    {
      worker: {
        $elemMatch: {
          user_id,
        },
      },
      ban_list: {
        $nin: [user_id],
      },
      ...filter,
    },
    {
      worker: 0,
      ban_list: 0,
    },
    {
      skip,
      sort: { _id: 1 },
    }
  )
    .populate("requester")
    .populate("task_type");

  if (type) {
    tasks = tasks.filter((task) => task.task_type.name === type);
  }

  tasks = tasks.splice(0, 10);

  return tasks;
};

const getUserTasksCount = async ({ user_id, type, startDate, name }) => {
  const filter = {};
  if (startDate) {
    filter.start_date = {
      $gte: new Date(startDate),
    };
  }
  if (name) {
    filter.task_name = { $regex: name, $options: "i" };
  }

  let tasks = await db.Task.find({
    worker: {
      $elemMatch: {
        user_id,
      },
    },
    ban_list: {
      $nin: [user_id],
    },
    ...filter,
  }).populate("task_type");

  if (type) {
    tasks = tasks.filter((task) => task.task_type.name === type);
  }

  return tasks.length;
};

const getTask = async ({ task_id, user_id }) => {
  const task = await db.Task.findOne(
    {
      _id: task_id,
      worker: {
        $elemMatch: {
          user_id,
        },
      },
    },
    {
      worker: 0,
      ban_list: 0,
    },
    {
      sort: {
        _id: 1,
      },
    }
  )
    .populate("requester")
    .populate("task_type");

  return task;
};

const getNearTask = async ({ task_id, user_id, direction }) => {
  // console.log(type, startDate, name)
  // const filter = {}
  // if(startDate){
  //     filter.start_date = {
  //         $gte: new Date(startDate)
  //     }
  // }
  // if(name){
  //     filter.task_name = { $regex: name, $options: 'i'}
  // }

  let comparator = "$lt";
  let sort = -1;

  if (direction === "next") {
    comparator = "$gt";
    sort = 1;
  }
  const task = await db.Task.findOne(
    {
      _id: { [comparator]: task_id },
      worker: {
        $elemMatch: {
          user_id,
        },
      },
      // ...filter
    },
    {
      worker: 0,
      ban_list: 0,
    },
    {
      sort: { _id: sort },
    }
  )
    .populate("requester")
    .populate("task_type");

  return task;
  // if(type){
  //     const task = results.filter(item => item.task_type.name === type)[0];
  //     return task
  // }else{
  //     return results[0]
  // }
};

const getAllData = async ({ task_id, user_id, skip, status, question }) => {
  let data = await db.Data.find(
    {
      task: task_id,
    },
    {
      text: 1,
      price: 1,
      task: 1,
      labels: {
        $elemMatch: {
          worker: user_id,
        },
      },
    },
    { skip, sort: { _id: 1 } }
  );
  data = data.filter((item) => {
    let isValid = true;
    if (item.labels[0]?.answer && status === "false") {
      isValid = false;
    } else if (!item.labels[0]?.answer && status === "true") {
      isValid = false;
    }

    if (
      question &&
      !String(item.text).includes(String(question).toLowerCase())
    ) {
      isValid = false;
    }
    return isValid;
  });

  return data.splice(0, 5);
};

const getAllDataCount = async ({ task_id, user_id, status, question }) => {
  let data = await db.Data.find(
    { task: task_id },
    {
      text: 1,
      price: 1,
      task: 1,
      labels: {
        $elemMatch: {
          worker: user_id,
        },
      },
    }
  );
  data = data.filter((item) => {
    let isValid = true;
    if (item.labels[0]?.answer && status === "false") {
      isValid = false;
    } else if (!item.labels[0]?.answer && status === "true") {
      isValid = false;
    }
    if (!String(item.text).includes(String(question).toLowerCase())) {
      isValid = false;
    }
    return isValid;
  });
  return data.length;
};

const getData = async ({ data_id, user_id }) => {
  const data = await db.Data.findById(data_id, {
    text: 1,
    price: 1,
    task: 1,
    labels: {
      $elemMatch: {
        worker: user_id,
      },
    },
  });

  return data;
};

const getNearData = async ({ task_id, data_id, user_id, direction }) => {
  let comparator = "$lt";
  let sort = -1;
  if (direction === "next") {
    comparator = "$gt";
    sort = 1;
  }

  const data = await db.Data.findOne(
    {
      task: task_id,
      _id: { [comparator]: data_id },
    },
    {
      text: 1,
      price: 1,
      task: 1,
      labels: {
        $elemMatch: {
          worker: user_id,
        },
      },
    },
    {
      sort: { _id: sort },
      limit: 1,
    }
  );

  return data;
};

const storeLabel = async ({ data_id, label_id, label }) => {
  const data = await db.Data.findById(data_id);
  const labelObject = data.labels.id(label_id);
  if (labelObject === null) {
    data.labels.push(label);
  } else {
    labelObject.answer = label.answer;
  }

  await data.save();
  return data;
};

const getAllChat = async ({ user_id, task_id }) => {
  const task = await db.Task.findOne(
    {
      _id: task_id,
      worker: {
        $elemMatch: {
          user_id,
        },
      },
    },
    {
      worker: {
        $elemMatch: {
          user_id,
        },
      },
      ban_list: 1,
      possible_label: 1,
      data: 1
    },
    {
      sort: {
        _id: 1,
      },
    }
  )
    .populate("requester")
    .populate("task_type")
    .populate({
      path: "worker.chat",
      model: "Chat",
      populate: {
        path: "user",
        model: "User",
      },
    });

  return task;
};

module.exports = {
  taskStats,
  getLastChats,
  getMarketTasks,
  getMarketTasksCount,
  getMarketTask,
  getNearMarketTask,
  getTask,
  getNearTask,
  getUserTasks,
  getUserTasksCount,
  getAllData,
  getAllDataCount,
  getData,
  getNearData,
  storeLabel,
  getAllChat,
};
