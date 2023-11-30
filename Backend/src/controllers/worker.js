const { getMarketTasks, getUserTasks, getTask, getData, getAllData } = require('../dao/worker');
const { Data } = require('../models');

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
    if(user.role !== 'worker'){
        return res.status(403).json({message: 'Forbidden request'})
    }
    const task =  await getTask({task_id})
    if(!task){
        return res.status(404).json({message: "Task not found"})
    }
    return res.status(200).json({data: task})
}

async function tasks(req, res){
    const user = req.user
    const skip = req.query.skip
    if(user.role !== 'worker'){
        return res.status(403).json({message: 'Forbidden request'})
    }

    return res.status(200).json({data: await getUserTasks({user_id: user._id, skip})})
}

async function task(req, res){
    const user = await req.user
    const {task_id} = req.params
    if(user.role !== 'worker'){
        return res.status(403).json({message: 'Forbidden request'})
    }
    const task = await getTask({user_id: user._id, task_id})
    if(!task){
        return res.status(404).json({message: 'Task not found'})
    }

    return res.status(200).json({data: task});
}

async function getTaskData(req, res){
    const user = req.user
    const {task_id} = req.params
    const {skip} = req.query

    if(user.role !== 'worker'){
        return res.status(403).json({message: 'Forbidden request'})
    }

    const result = await getAllData({task_id, user_id: user._id, skip})
    const data = result.map(item => item.toObject())
    for(const item of data){
        let label = item.labels.length > 0 ? item.labels[0] : undefined;
        item['label'] = label
        item.labels = undefined
    }
    return res.status(200).json({data})
}

async function data(req, res){
    const user = req.user
    const {data_id} = req.params
    if(user.role !== 'worker'){
        return res.status(403).json({message: 'Forbidden request'})
    }

    const result = await getData({data_id, user_id: user._id})
    console.log(result)
    if(!result){
        return res.status(404).json({message: 'Data not found'})
    }

    const data = {...result.toObject()}
    let label
    if(data.labels.length > 0){
        label = data.labels[0]
    }
    data['label'] = label
    data.labels = undefined

    return res.status(200).json({data})
}

module.exports = {
    market,
    marketTask,
    tasks, 
    task,
    getTaskData,
    data
}