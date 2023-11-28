const express = require("express");
const {
  create_data,
  edit_data,
  label_data,
} = require("../../controllers/general/data");
const { authentication } = require("../../middleware/authentication");
const router = express.Router();

router.post("/create", [authentication], create_data);
router.post("/edit", [authentication], edit_data);
router.post("/label", [authentication], label_data);

module.exports = router;
