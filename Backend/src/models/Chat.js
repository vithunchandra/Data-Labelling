const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    text_chat: String,
  },
  { collection: "Chat" }
);

module.exports = mongoose.model("Chat", ChatSchema);
