const express = require("express");
const router = express.Router();
const {
  get_user,
  getUserById,
  fill_wallet,
} = require("../../controllers/general/user");
const { authentication } = require("../../middleware/authentication");

router.get("/", get_user);
router.get("/id/:user_id", getUserById);
router.post("/fill_wallet", [authentication], fill_wallet);

module.exports = router;
