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

const register = async (req, res) => {
  const create_param = req.body;
  create_param["credibility"] = 0;
  create_param["wallet"] = 0;

  // check role is only worker and requester
  create_param["role"] = String(create_param["role"]).toLowerCase();
  if (
    !(create_param["role"] == "worker" || create_param["role"] == "requester")
  ) {
    return res.status(400).json({ msg: "Role tidak valid" });
  }

  const user_now = await User.findOne({ username: req.body.username }).exec();
  if (user_now) {
    return res.status(400).json({ msg: "Username sudah terpakai" });
  }

  const create_user = await User.create(create_param);
  create_user["password"] = undefined;
  return res.status(200).json({ msg: "Berhasil", user: create_user });
};

module.exports = {
  login,
  register,
};
