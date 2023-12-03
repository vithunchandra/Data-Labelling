const express = require("express");
const { authentication } = require('../middleware/authentication');
const { tasks, task, market, marketTask, data, getTaskData, labelling, acceptTask } = require("../controllers/worker");
const router = express.Router();

router.get('/marketplace', [authentication], market)
router.get('/marketplace/:task_id', [authentication], marketTask)
router.post('/marketplace/:task_id', [authentication], acceptTask)
router.get('/task', [authentication], tasks)
router.get('/task/:task_id', [authentication], task)
router.get(`/task/:task_id/data`, [authentication], getTaskData)
router.get('/task/:task_id/data/:data_id', [authentication], data)
router.post('/task/:task_id/data/:data_id/:label_id', [authentication], labelling)

module.exports = router;