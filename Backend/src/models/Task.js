const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const workerSchema = new mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  chat: [{ type: Schema.Types.ObjectId, ref: "Chat" }],
  isBanned: Boolean,
});

const taskSchema = new mongoose.Schema(
  {
    task_name: String,
    task_description: String,
    possible_label: [String],
    start_date: Date,
    end_date: Date,
    active: Boolean,
    min_credibility: Number,
    requester: { type: Schema.Types.ObjectId, ref: "User" },
    task_type: { type: Schema.Types.ObjectId, ref: "Task_Type" },
    data: [{ type: Schema.Types.ObjectId, ref: "Data" }],
    ban_list: [{ type: Schema.Types.ObjectId, ref: "User" }],
    worker: [workerSchema],
  },
  { collection: "Task" }
);

module.exports = mongoose.model("Task", taskSchema);
