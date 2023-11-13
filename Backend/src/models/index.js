const db = {};

const Data = require("./Data");
const User = require("./User");
const Chat = require("./Chat");
const Task_Type = require("./Task_Type");
const Task = require("./Task");

db.User = User;
db.Chat = Chat;
db.Data = Data;
db.Task_Type = Task_Type;
db.Task = Task;

module.exports = db;
