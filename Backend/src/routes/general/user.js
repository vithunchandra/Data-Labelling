const express = require("express");
const router = express.Router();
const {
  get_user,
  getUserById,
  fill_wallet,
  getWallet,
  drawWallet,
} = require("../../controllers/general/user");
const { authentication } = require("../../middleware/authentication");

router.get("/", get_user);
router.get("/id/:user_id", getUserById);
router.get("/wallet", [authentication], getWallet);
router.put("/wallet/draw", [authentication], drawWallet);
router.post("/fill_wallet", [authentication], fill_wallet);

module.exports = router;
