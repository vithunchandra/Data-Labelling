const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const login = async (req, res) => {
  const user_now = await User.findOne({ username: req.body.username }).exec();

  if (!user_now) {
    return res.status(400).json({ msg: "Username tidak ditemukan" });
  } else {
    if (user_now["password"] == req.body.password) {
      user_now["password"] = undefined;
      return res.status(200).json({ msg: "Berhasil", user: user_now });
    } else {
      return res.status(400).json({ msg: "Password salah" });
    }
  }
};

module.exports = {
  login,
};
