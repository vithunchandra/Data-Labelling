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

module.exports = {
  get_user,
};
