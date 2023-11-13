const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    text_chat: String,
    timestamp: Date,
  },
  { collection: "Chat" }
);

module.exports = mongoose.model("Chat", ChatSchema);
