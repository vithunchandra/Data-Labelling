const jwt = require("jsonwebtoken");
const { User } = require("../models");

async function authentication(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Authentication failed" });
  }
  console.log(token);
  // Slight change because 'bearer' is 'Bearer' on postman
  // based on chatGPT.
  const jwtToken = token.slice(7);
  if (!jwtToken) {
    return res.status(401).json({ message: "JWT token required" });
  }

  let user;
  try {
    user = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET)["user"];
  } catch (err) {
    return res.status(401).json({ message: "JWT token is invalid" });
  }

  // adding await
  user = await User.findById(user._id).exec();
  // should not be possible, but to verify again...
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  req.user = user;
  next();
}

module.exports = { authentication };
