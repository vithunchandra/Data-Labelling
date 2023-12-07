const express = require("express");
const { authentication } = require('../middleware/authentication');
const { tasks, task, market, marketTask, data, getTaskData, labelling, acceptTask, getChats, storeChat, taskStatistics, lastTask, lastChats } = require("../controllers/worker");
const { getLastChats } = require("../dao/worker");
const router = express.Router();

router.get('/marketplace', [authentication], market)
router.get('/marketplace/:task_id', [authentication], marketTask)
router.post('/marketplace/:task_id', [authentication], acceptTask)
router.get('/lastchats', [authentication], lastChats)
router.get('/task', [authentication], tasks)
router.get('/task/last', [authentication], lastTask)
router.get('/task/stats', [authentication], taskStatistics)
router.get('/task/:task_id', [authentication], task)
router.get(`/task/:task_id/data`, [authentication], getTaskData)
router.get('/task/:task_id/data/:data_id', [authentication], data)
router.post('/task/:task_id/data/:data_id/:label_id', [authentication], labelling)
router.get('/task/:task_id/chat', [authentication], getChats)
router.post('/task/:task_id/chat', [authentication], storeChat)

module.exports = router;