const express = require("express");
const router = express.Router();
const { get_user, getUser } = require("../../controllers/general/user");

router.get("/", get_user);
router.get('/:user_id', getUser)

module.exports = router;
