const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    task_id: {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
    text_chat: String,
    timestamp: Date,
    is_read: Boolean,
  },
  { collection: "Chat" }
);

module.exports = mongoose.model("Chat", ChatSchema);
