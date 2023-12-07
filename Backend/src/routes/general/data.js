const express = require("express");
const {
  create_data,
  edit_data,
  label_data,
  create_bulk_data,
  bulk_edit_data,
  delete_data,
  bulk_delete_data,
} = require("../../controllers/general/data");
const { authentication } = require("../../middleware/authentication");
const router = express.Router();

router.post("/create", [authentication], create_data);
router.post("/bulk_create", [authentication], create_bulk_data);
router.post("/edit", [authentication], edit_data);
router.post("/bulk_edit", [authentication], bulk_edit_data);
router.post("/label", [authentication], label_data);

router.delete("/bulk_delete", [authentication], bulk_delete_data);
router.delete("/delete", [authentication], delete_data);

module.exports = router;
