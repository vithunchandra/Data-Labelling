const mongoose = require("mongoose");

const connection = mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/db_data_labeller"
);

mongoose.set('debug', true)


module.exports = connection;
