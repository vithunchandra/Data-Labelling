const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    text: String,
    labels: [
      {
        worker: {
          type: [Schema.Types.ObjectId],
          ref: "User",
        },
        answer: String,
        price: Number,
      },
    ],
  },
  { collection: "Data" }
);

module.exports = mongoose.model("Data", dataSchema);
