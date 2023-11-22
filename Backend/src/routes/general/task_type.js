const express = require("express");
const router = express.Router();
const {
  create_task_type,
  get_all_task_type,
} = require("../../controllers/general/task_type");

router.post("/create", create_task_type);
router.get("/", get_all_task_type);

module.exports = router;
