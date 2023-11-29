const { getMarketTasks, getMarketTask } = require("../../../dao/worker/task");

async function market (req, res){
    const user = req.user
    const skip = req.query.skip
    if(user.role !== 'worker'){
        return res.status(403).json({message: 'Forbidden request'})
    }

    return res.status(200).json({data: await getMarketTasks({user_id: user._id, skip})})
}

async function marketTask(req, res){
    const user = req.user
    const {task_id} = req.params
    const task =  await getMarketTask({task_id})
    if(!task){
        return res.status(404).json({message: "Task not found"})
    }
    return res.status(200).json({data: task})
}

module.exports = {
    market,
    marketTask
}