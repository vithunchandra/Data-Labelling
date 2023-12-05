const express = require("express");
const router = express.Router();
const {
  create_task,
  get_task,
  get_user_task,
  take_task,
  get_task_by_id,
} = require("../../controllers/general/task");
const { authentication } = require("../../middleware/authentication");

router.post("/create", [authentication], create_task);
router.post("/take", [authentication], take_task);
router.get("/", [authentication], get_task);
router.get("/user", [authentication], get_user_task);
router.get("/id/:task_id", [authentication], get_task_by_id);

module.exports = router;
