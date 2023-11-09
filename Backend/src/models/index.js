const db = {};

const { Schema } = require("mongoose");
const User = require("./User");
const Chat = require("./Chat");
const Data = require("./Data");
const Task_Type = require("./Task_Type");
const Task = require("./Task");

Data.schema.add({
  worker: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  chat: {
    type: [Schema.Types.ObjectId],
    ref: "Chat",
  },
});

Task.schema.add({
  requester: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  task_type: {
    type: Schema.Types.ObjectId,
    ref: "Task_Type",
  },
  data: {
    type: [Schema.Types.ObjectId],
    ref: "Data",
  },
  ban_list: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
});

db.User = User;
db.Chat = Chat;
db.Data = Data;
db.Task_Type = Task_Type;
db.Task = Task;

module.exports = db;
