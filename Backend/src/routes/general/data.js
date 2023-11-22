const express = require("express");
const { create_data, edit_data } = require("../../controllers/general/data");
const router = express.Router();

router.post("/create", create_data);
router.post("/edit", edit_data);

module.exports = router;
