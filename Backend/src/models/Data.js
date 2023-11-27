const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const labelSchema = new mongoose.Schema({
  worker: { type: Schema.Types.ObjectId, ref: "User",},
  answer: String,
})

const dataSchema = new mongoose.Schema(
  {
    text: String,
    price: Number,
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
    labels: [labelSchema],
  },
  { collection: "Data" }
);

module.exports = mongoose.model("Data", dataSchema);
