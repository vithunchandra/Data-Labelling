const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    name: String,
    role: String,
    credibility: Number,
    wallet: Number,
  },
  { collection: "User" }
);

module.exports = mongoose.model("User", userSchema);
