const { default: mongoose } = require("mongoose");
const { User, Data, Task, Chat, Task_Type } = require("../models");
const db = require("../models/index");

const expand_task_aggregation_condition = [
  {
    $lookup: {
      from: "Data",
      localField: "data",
      foreignField: "_id",
      as: "data",
    },
  },
  {
    $lookup: {
      from: "User",
      localField: "requester",
      foreignField: "_id",
      as: "requester",
    },
  },
  {
    $lookup: {
      from: "Task_Type",
      localField: "task_type",
      foreignField: "_id",
      as: "task_type",
    },
  },
  {
    $lookup: {
      from: "User",
      localField: "ban_list",
      foreignField: "_id",
      as: "ban_list",
    },
  },
  {
    $lookup: {
      from: "User",
      localField: "worker.user_id",
      foreignField: "_id",
      as: "worker.user",
    },
  },
];

const allUser = async (req, res) => {
  const currentUser = req.user;
  if (currentUser.role !== "admin") {
    return res.status(403).json({ message: "Forbidden request" });
  }
  let user = [];
  user = await User.find({ role: { $ne: "admin" } });

  return res.status(200).json(user);
};

const allTask = async (req, res) => {
  const currentUser = req.user;
  if (currentUser.role !== "admin") {
    return res.status(403).json({ message: "Forbidden request" });
  }
  let task = [];
  task = await Task.find().populate("requester task_type data");

  return res.status(200).json(task);
};

const lastUser = async (req, res) => {
  const currentUser = req.user;
  if (currentUser.role !== "admin") {
    return res.status(403).json({ message: "Forbidden request" });
  }

  try {
    const users = await User.find({ role: { $ne: "admin" } })
      .sort({ _id: -1 })
      .limit(5);
    const totalUser = await User.countDocuments({ role: { $ne: "admin" } });

    return res.status(200).json({ users, totalUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const lastTask = async (req, res) => {
  const currentUser = req.user;
  if (currentUser.role !== "admin") {
    return res.status(403).json({ message: "Forbidden request" });
  }
  let task = [];
  task = await Task.find()
    .populate("requester task_type data")
    .sort({ _id: -1 })
    .limit(5);
  const totalTask = await Task.countDocuments();

  return res.status(200).json({ task, totalTask });
};

const lastTaskType = async (req, res) => {
  const currentUser = req.user;
  if (currentUser.role !== "admin") {
    return res.status(403).json({ message: "Forbidden request" });
  }
  const task_type = await Task_Type.find().sort({ _id: -1 }).limit(5);
  const totalTaskType = await Task_Type.countDocuments();

  return res.status(200).json({ task_type, totalTaskType });
};

const getUserDetail = async (req, res) => {
  const currentUser = req.user;
  if (currentUser.role !== "admin") {
    return res.status(403).json({ message: "Forbidden request" });
  }
  const { expand, task_type_id } = req.query;
  const { user_id } = req.params;
  const user = await User.findById(user_id);
  if (user.role == "requester") {
    let condition_now = [
      { $match: { _id: new mongoose.Types.ObjectId(user_id) } },
      { $project: { password: 0 } },
      {
        $lookup: {
          from: "Task",
          localField: "tasks",
          foreignField: "_id",
          as: "tasks",
        },
      },
    ];

    if (task_type_id) {
      condition_now = [
        ...condition_now,
        {
          $project: {
            email: 1,
            name: 1,
            role: 1,
            credibility: 1,
            wallet: 1,
            tasks: {
              $filter: {
                input: "$tasks",
                cond: {
                  $eq: [
                    "$$tasks.task_type",
                    new mongoose.Types.ObjectId(task_type_id),
                  ],
                },
                as: "tasks",
              },
            },
          },
        },
      ];
    }

    condition_now = [
      ...condition_now,
      {
        $project: { tasks: 1 },
      },
      {
        $unwind: "$tasks",
      },
      {
        $replaceRoot: { newRoot: "$tasks" },
      },
    ];

    if (expand) {
      if (expand == "1" || expand == "true" || expand == 1) {
        condition_now = [
          ...condition_now,
          ...expand_task_aggregation_condition,
        ];
      }
    }

    const all_task = await User.aggregate(condition_now).exec();

    return res.status(200).json(all_task);
  } else if (user.role == "worker") {
    
    // return res.status(200).json(tasks);
  }
};

const getClosedTask = async (req, res) => {
  const currentUser = req.user;
  if (currentUser.role !== "admin") {
    return res.status(403).json({ message: "Forbidden request" });
  }
  try {
    const tasks = await Task.find({ active: false })
      .populate({
        path: "requester",
        model: "User",
      })
      .populate({
        path: "task_type",
        model: "Task_Type",
      })
      .populate({
        path: "data",
        model: "Data",
        populate: {
          path: "labels.worker",
          model: "User",
        },
      })
      .exec();

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  allUser,
  getUserDetail,
  allTask,
  lastTask,
  lastUser,
  lastTaskType,
  getClosedTask,
};
