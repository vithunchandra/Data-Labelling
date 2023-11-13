const express = require("express");
const router = express.Router();
const { create_task } = require("../controllers/task");

router.post("/create_task", create_task);

module.exports = router;
