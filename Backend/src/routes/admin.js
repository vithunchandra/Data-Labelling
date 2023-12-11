const express = require("express");
const { authentication } = require("../middleware/authentication");
const {
  allUser,
  getUserDetail,
  allTask,
  lastTask,
  lastUser,
  lastTaskType,
  test,
} = require("../controllers/admin");

const router = express.Router();

router.get("/all_users", [authentication], allUser);
router.get("/user_detail/:user_id", [authentication], getUserDetail);
router.get("/all_tasks", [authentication], allTask);
router.get("/last_users", [authentication], lastUser);
router.get("/last_tasks", [authentication], lastTask);
router.get("/last_task_types", [authentication], lastTaskType);
router.get("/test", [authentication], test);

module.exports = router;
