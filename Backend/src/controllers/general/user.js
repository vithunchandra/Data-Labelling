const { default: mongoose } = require("mongoose");
const { User, Task } = require("../../models");

const get_user = async (req, res) => {
  const { role, expand } = req.query;
  let user = [];
  if (role) {
    if (
      String(role).toLowerCase() == "worker" ||
      String(role).toLowerCase() == "requester"
    ) {
      user = await User.find({ role: role });
    } else {
      return res.status(400).json({
        msg: "Roles must be worker or requester",
      });
    }
  } else {
    user = await User.find();
  }

  return res.status(200).json(user);
};

const getUserById = async (req, res) => {
  const { user_id } = req.params;
  const user = await User.findById(user_id);
  if (user === null) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json(user);
};

const getWallet = async (req, res) => {
  return res.status(200).json({ wallet: req.user.wallet });
};

const fill_wallet = async (req, res) => {
  const user = req.user;
  const { amount } = req.body;

  // check user is requester
  if (user.role !== "requester") {
    return res.status(400).json({
      message: "Role must be requester",
    });
  }

  if (amount <= 0) {
    return res.status(400).json({
      message: "Amount must be greater than 0",
    });
  }

  // find and update user wallet
  const new_user = await User.findByIdAndUpdate(
    user._id,
    {
      $inc: { wallet: amount },
    },
    { new: true } // return updated user
  );

  return res.status(200).json({
    msg: "suceed",
    new_user,
  });
};

async function drawWallet(req, res) {
  const user = req.user;
  const amount = req.body.amount;

  if (amount > user.wallet) {
    return res.status(400).json({ message: "Wallet is not sufficient" });
  }
  user.wallet = parseInt(user.wallet) - parseInt(amount);
  user.save();

  return res.status(200).json({ wallet: user.wallet });
}

const get_all_banned_user = async (req, res) => {
  const user = req.user;
  const user_id = user._id;
  if (String(user.role).toLowerCase() != "requester") {
    return res.status(403).json({
      msg: "Only requester can acess this!",
    });
  }

  let condition_now = [
    { $match: { requester: new mongoose.Types.ObjectId(user_id) } },
    { $unwind: "$ban_list" },
    {
      $project: {
        _id: 1,
        task_name: 1,
        ban_list: 1,
      },
    },
    {
      $lookup: {
        from: "User",
        localField: "ban_list",
        foreignField: "_id",
        as: "baned_user",
      },
    },
  ];

  const all_banned_user = await Task.aggregate(condition_now).exec();

  return res.status(200).json(all_banned_user);
};

module.exports = {
  get_user,
  getUserById,
  getWallet,
  fill_wallet,
  drawWallet,
  get_all_banned_user,
};
