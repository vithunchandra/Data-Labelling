const express = require("express");
const router = express.Router();
const { chat } = require("../../controllers/general/chat");
const { authentication } = require("../../middleware/authentication");

router.post("/create", [authentication], chat);

module.exports = router;
