const { getMarketTasks, getUserTasks, getTask, getData, getAllData, getNearTask, getMarketTask, getNearMarketTask, getNearData, storeLabel, getMarketTasksCount, getUserTasksCount, getAllDataCount, getAllChat, getFinishedTask, taskStats, getLastChats } = require('../dao/worker');
const { Data, Task, Chat } = require('../models');
const db = require('../models/index');
const { baseEmailOptions, transporter } = require('../notfication/transporter');

async function taskStatistics(req, res){
    const user = req.user;
    const results = await taskStats({user_id: user._id})

    return res.status(200).json({...results})
}

async function lastTask(req, res){
    const user = req.user
    const task_id = req.user.tasks[0]
    if(!task_id){
        return res.status(200).json({message: 'Last task is empty'})
    }
    const task = await getTask({task_id: task_id, user_id: user._id})
    const results = await getAllData({task_id: task_id, user_id: user._id, skip: 0})
    const data = results.map(item => item.toObject())
    for(const item of data){
        let label = item.labels.length > 0 ? item.labels[0] : undefined;
        item['label'] = label
        item.labels = undefined
    }
    return res.status(200).json({task, data})
}

async function lastChats(req, res){
    const user = req.user
    const chats = await getLastChats({user_id: user._id})

    return res.status(200).json({chats})
}

async function market (req, res){
    const user = req.user
    const page = req.query.page
    if(user.role !== 'worker'){
        return res.status(403).json({message: 'Forbidden request'})
    }

    const marketTask = await getMarketTasks({user_id: user._id, skip: (page - 1) * 10, ...req.query})
    const totalMarketTask = await getMarketTasksCount({user_id: user._id, ...req.query})
    let totalPages = (totalMarketTask / 10)

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
    if(user.credibility < task.min_credibility){
        return res.status(400).json({message: 'User credibility below minimun threshold'})
    }

    task.worker.push({
        chat: [],
        isBanned: false,
        user_id: user._id
    })
    

    const mailOptions = {
        ...baseEmailOptions,
        to: task.requester.email,
        subject: "Task Accepted",
        html: `
            <h1>Hello, Requester ${user.name}<h1></br>
            <b>Your task, "${task.task_name}" has been accepted by ${user.email}</b>
        `,
        text: `Your task has been accepted by ${user.email}`,
    }

    try{
        transporter.sendMail(mailOptions)
    }catch(err){
        return res.status(500).json({message: err.message})
    }

    task.save()

    return res.status(201).json({message: 'Task accepted successfully'})
}

async function tasks(req, res){
    const user = req.user
    const page = req.query.page
    if(user.role !== 'worker'){
        return res.status(403).json({message: 'Forbidden request'})
    }
    const userTasks = await getUserTasks({
        user_id: user._id, 
        skip: (page - 1) * 10,
        ...req.query
    })
    const totalUserTasks = await getUserTasksCount({
        user_id: user._id,
        ...req.query
    })
    const totalPages = totalUserTasks / 10

    return res.status(200).json({tasks: userTasks, totalPages: Math.ceil(totalPages)})
}

async function task(req, res){
    const user = await req.user
    const {task_id} = req.params
    const {type, startDate, name} = req.query
    if(user.role !== 'worker'){
        return res.status(403).json({message: 'Forbidden request'})
    }
    const task = await getTask({task_id, user_id: user._id})
    const prevTask = await getNearTask({task_id, user_id: user._id, direction: 'prev'})
    const nextTask = await getNearTask({task_id, user_id: user._id, direction: 'next'})
    if(!task){
        return res.status(404).json({message: 'Task not found'})
    }
    user.tasks[0] = task._id
    await user.save()

    return res.status(200).json({task, prev: prevTask, next: nextTask});
}

async function getTaskData(req, res){
    const user = req.user
    const {task_id} = req.params
    const {status, question, page} = req.query
    if(user.role !== 'worker'){
        return res.status(403).json({message: 'Forbidden request'})
    }

    const result = await getAllData({task_id, user_id: user._id, skip: (page - 1) * 5, status, question})
    const data = result.map(item => item.toObject())
    for(const item of data){
        let label = item.labels.length > 0 ? item.labels[0] : undefined;
        item['label'] = label
        item.labels = undefined
    }
    const totalData = await getAllDataCount({task_id, user_id: user._id, status, question})
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
    const data = await Data.findById(data_id)
    const task = await Task.findById(data.task)
    const isExist = task.ban_list.some((item) => {
        return item === user._id
    })
    if(isExist){
        return res.status(400).json({message: 'Your account is banned from this task'})
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
    const chatId = []
    for(const chat of chats){
        chatId.push(chat._id)
    }
    await db.Chat.updateMany(
        { _id: {$in: chatId} },
        { is_read: true },
    )

    return res.status(200).json(chats)
}

async function storeChat(req, res){
    const user = req.user
    const {task_id} = req.params
    const {message} = req.body
    
    const task = await getAllChat({user_id: user._id, task_id})
    console.log(task);
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
    taskStatistics,
    lastTask,
    lastChats,
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