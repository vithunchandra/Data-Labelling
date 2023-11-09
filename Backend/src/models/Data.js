const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    text: String,
    answer: String,
    price: Number,
  },
  { collection: "Data" }
);

module.exports = mongoose.model("Data", dataSchema);
