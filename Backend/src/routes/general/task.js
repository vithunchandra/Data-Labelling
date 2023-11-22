const express = require("express");
const router = express.Router();
const {
  create_task,
  get_task,
  get_user_task,
} = require("../../controllers/general/task");

router.post("/create", create_task);
router.get("/", get_task);
router.get("/user/:user_id", get_user_task);

module.exports = router;
