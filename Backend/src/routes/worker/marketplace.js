const express = require("express");
const { market, marketTask } = require("../../controllers/general/worker/Marketplace");
const { authentication } = require("../../middleware/authentication");
const router = express.Router();

router.get('/marketplace', [authentication], market)
router.get('/marketplace/:task_id', [authentication], marketTask)

module.exports = router;