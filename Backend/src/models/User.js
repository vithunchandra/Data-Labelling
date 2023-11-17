const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    name: String,
    role: String,
    credibility: Number,
    wallet: Number,
    tasks: {
      type: [Schema.Types.ObjectId],
      ref: "Task",
    },
  },
  { collection: "User" }
);

module.exports = mongoose.model("User", userSchema);
