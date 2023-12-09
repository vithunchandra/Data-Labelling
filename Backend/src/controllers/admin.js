const { default: mongoose } = require("mongoose");
const { User, Data, Task, Chat } = require("../models");
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

const getUserDetail = async (req, res) => {
  const currentUser = req.user;
  if (currentUser.role !== "admin") {
    return res.status(403).json({ message: "Forbidden request" });
  }
  const { expand, task_type_id } = req.query;
  const { user_id } = req.params;
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
      condition_now = [...condition_now, ...expand_task_aggregation_condition];
    }
  }

  const all_task = await User.aggregate(condition_now).exec();

  return res.status(200).json(all_task);
};

module.exports = {
  allUser,
  getUserDetail,
  allTask,
};
