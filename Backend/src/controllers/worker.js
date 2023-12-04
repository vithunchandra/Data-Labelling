const { getMarketTasks, getUserTasks, getTask, getData, getAllData, getNearTask, getMarketTask, getNearMarketTask, getNearData, storeLabel, getMarketTasksCount, getUserTasksCount, getAllDataCount, getAllChat } = require('../dao/worker');
const { Data, Task, Chat } = require('../models');

async function market (req, res){
    const user = req.user
    const page = req.query.page
    if(user.role !== 'worker'){
        return res.status(403).json({message: 'Forbidden request'})
    }

    const marketTask = await getMarketTasks({user_id: user._id, skip: (page - 1) * 10})
    const totalMarketTask = await getMarketTasksCount({user_id: user._id})
    let totalPages = (totalMarketTask / 10) + (totalMarketTask % 10 > 0 ? 1 : 0)

    return res.status(200).json({tasks: marketTask, totalPages: Math.ceil(totalPages)})
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

async function acceptTask(req, res){
    const user = req.user
    const {task_id} = req.params

    if(user.role !== 'worker'){
        return res.status(403).json({message: 'Forbidden request'})
    }
    const task = await getMarketTask({user_id: user._id, task_id})
    if(!task){
        return res.status(404).json({message: "Task not found"})
    }
    task.worker.push({
        chat: [],
        isBanned: false,
        user_id: user._id
    })
    task.save()

    return res.status(201).json({message: 'Task accepted successfully'})
}

async function tasks(req, res){
    const user = req.user
    const page = req.query.page
    if(user.role !== 'worker'){
        return res.status(403).json({message: 'Forbidden request'})
    }
    
    const userTasks = await getUserTasks({user_id: user._id, skip: (page - 1) * 10})
    const totalUserTasks = await getUserTasksCount({user_id: user._id})
    const totalPages = totalUserTasks / 10

    return res.status(200).json({tasks: userTasks, totalPages: Math.ceil(totalPages)})
}

async function task(req, res){
    const user = await req.user
    const {task_id} = req.params
    if(user.role !== 'worker'){
        return res.status(403).json({message: 'Forbidden request'})
    }
    const task = await getTask({task_id, user_id: user._id})
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
    const page = req.query.page
    if(user.role !== 'worker'){
        return res.status(403).json({message: 'Forbidden request'})
    }

    const result = await getAllData({task_id, user_id: user._id, skip: (page - 1) * 5})
    const data = result.map(item => item.toObject())
    for(const item of data){
        let label = item.labels.length > 0 ? item.labels[0] : undefined;
        item['label'] = label
        item.labels = undefined
    }
    const totalData = await getAllDataCount({task_id})
    const totalPages = totalData / 5

    return res.status(200).json({data, totalPages: Math.ceil(totalPages)})
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

async function getChats(req, res){
    const user = req.user
    const {task_id} = req.params

    if(user.role !== 'worker'){
        return res.status(403).json({message: 'Forbidden request'})
    }
    const task = await getAllChat({user_id: user._id, task_id})
    const chats = task.worker[0].chat

    return res.status(200).json(chats)
}

async function storeChat(req, res){
    const user = req.user
    const {task_id} = req.params
    const {message} = req.body
    
    const task = await getAllChat({user_id: user._id, task_id})
    if(task === null){
        return res.status(404).json({message: 'Task not found'})
    }
    const chat = await Chat.create({
        user: user._id,
        text_chat: message,
        task_id: task_id,
        is_read: false,
    })
    task.worker[0].chat.push(chat._id)
    task.save()

    return res.status(201).json({message: 'Message sent successfully'})
}

module.exports = {
    market,
    marketTask,
    acceptTask,
    tasks, 
    task,
    getTaskData,
    data,
    labelling,
    getChats,
    storeChat
}