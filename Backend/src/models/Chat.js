const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    text_chat: String,
    timestamp: Date,
  },
  { collection: "Chat" }
);

module.exports = mongoose.model("Chat", ChatSchema);
