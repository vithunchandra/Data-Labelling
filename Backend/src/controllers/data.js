const { Data } = require("../models");

const create_data = async (req, res) => {
  console.log(req.body);
};

module.exports = {
  create_data,
};
