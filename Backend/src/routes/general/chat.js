const express = require("express");
const router = express.Router();
const { chat } = require("../../controllers/general/chat");

router.post("/create", chat);

module.exports = router;
