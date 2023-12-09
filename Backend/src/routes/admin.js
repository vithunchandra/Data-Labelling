const express = require("express");
const { authentication } = require("../middleware/authentication");
const { allUser, getUserDetail } = require("../controllers/admin");

const router = express.Router();

router.get("/all_users", [authentication], allUser);
router.get("/user_detail/:user_id", [authentication], getUserDetail);

module.exports = router;
