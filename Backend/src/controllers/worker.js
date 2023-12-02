const { getMarketTasks, getUserTasks, getTask, getData, getAllData, getNearTask, getMarketTask, getNearMarketTask, getNearData, storeLabel } = require('../dao/worker');
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

    const task = await getMarketTask({user_id: user._id, task_id})
    const prevTask = await getNearMarketTask({user_id: user._id, task_id, direction: 'prev'})
    const nextTask = await getNearMarketTask({user_id: user._id, task_id, direction: 'next'})
    if(!task){
        return res.status(404).json({message: "Task not found"})
    }
    return res.status(200).json({task, prev: prevTask, next: nextTask})
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
    const task = await getTask({task_id, user_id: user._id})
    console.log('hallo')
    const prevTask = await getNearTask({task_id, user_id: user._id, direction: 'prev'})
    const nextTask = await getNearTask({task_id, user_id: user._id, direction: 'next'})
    if(!task){
        return res.status(404).json({message: 'Task not found'})
    }

    return res.status(200).json({task, prev: prevTask, next: nextTask});
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
    const {task_id, data_id} = req.params
    if(user.role !== 'worker'){
        return res.status(403).json({message: 'Forbidden request'})
    }

    const result = []
    result.push(await getData({data_id, user_id: user._id}))
    result.push(await getNearData({task_id, data_id, user_id: user._id, direction: 'prev'}))
    result.push(await getNearData({task_id, data_id, user_id: user._id, direction: 'next'}))

    if(!result[0]){
        return res.status(404).json({message: 'Data not found'})
    }

    const key = ['data', 'prev', 'next']
    const object = {}
    for(let i=0; i<result.length; i++){
        const data = result[i] ? {...result[i].toObject()} : undefined
        console.log(data)
        if(data){
            let label
            if(data.labels.length > 0){
                label = data.labels[0]
            }
            data['label'] = label
            data.labels = undefined
        }
        object[key[i]] = data
    }
   
    return res.status(200).json(object)
}

async function labelling(req, res){
    const user = req.user
    const {data_id, task_id} = req.params
    if(user.role !== 'worker'){
        return res.status(403).json({message: 'Forbidden request'})
    }

    const result = await storeLabel({data_id, label_id: req.body.label_id, label: {
        worker: user._id,
        answer: req.body.input
    }})

    return res.status(201).json(result)
}

module.exports = {
    market,
    marketTask,
    tasks, 
    task,
    getTaskData,
    data,
    labelling
}