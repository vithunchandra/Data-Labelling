const express = require("express");
const router = express.Router();
const {
  create_task,
  get_task,
  get_user_task,
  take_task,
} = require("../../controllers/general/task");
const { authentication } = require("../../middleware/authentication");

router.post("/create", [authentication], create_task);
router.post("/take", [authentication], take_task);
router.get("/", [authentication], get_task);
router.get("/user", [authentication], get_user_task);

module.exports = router;
