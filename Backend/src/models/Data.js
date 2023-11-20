const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    text: String,
    price: Number,
    labels: [
      {
        worker: {
          type: [Schema.Types.ObjectId],
          ref: "User",
        },
        answer: String,
      },
    ],
  },
  { collection: "Data" }
);

module.exports = mongoose.model("Data", dataSchema);
