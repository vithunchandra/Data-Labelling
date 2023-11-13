const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const TaskTypeSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
  },
  { collection: "Task_Type" }
);

module.exports = mongoose.model("Task_Type", TaskTypeSchema);
