const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    task_name: String,
    possible_label: [String],
    start_date: Date,
    end_date: Date,
  },
  { collection: "Task" }
);

module.exports = mongoose.model("Task", taskSchema);
