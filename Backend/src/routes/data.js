const express = require("express");
const router = express.Router();
const { create_data, edit_data } = require("../controllers/data");

router.post("/create", create_data);
router.post("/edit", edit_data);

module.exports = router;
