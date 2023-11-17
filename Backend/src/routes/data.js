const express = require("express");
const router = express.Router();
const { create_data } = require("../controllers/data");

router.post("/create", create_data);

module.exports = router;
