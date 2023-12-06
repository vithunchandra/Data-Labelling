const { User } = require("../../models");

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

module.exports = {
  get_user,
  getUserById,
  fill_wallet,
};
