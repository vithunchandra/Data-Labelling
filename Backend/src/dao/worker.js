const db = require("../models")

const getMarketTasks = async ({user_id, skip}) => {
    const tasks = await db.Task.find(
        {
            worker: {
                $not: {
                    $elemMatch: {
                        user_id
                    }
                }
            },
            ban_list: {
                $nin: [user_id]
            }
        },
        {
            worker: 0,
            ban_list: 0
        },
        {
            skip,
            limit: 10
        }
    ).populate('requester')
    .populate('task_type')

    return tasks
}

const getUserTasks = async ({user_id, skip}) => {
    const tasks = await db.Task.find(
        {
            worker: {
                $elemMatch: {
                    user_id
                }
            },
            ban_list: {
                $nin: [user_id]
            }
        },
        {
            worker: 0,
            ban_list: 0
        },
        {
            skip,
            limit: 10
        }
    ).populate('requester')
    .populate('task_type')
    
    return tasks;
}

const getTask = async ({user_id, task_id}) => {
    const task = await db.Task.findById(
        task_id,
        {
            worker: 0,
            ban_list: 0
        }
    ).populate('requester')
    .populate('task_type')
    
    return task
}

const getAllData = async ({task_id, user_id, skip}) => {
    const data = await db.Data.find(
        {task: task_id},
        {
            text: 1,
            price: 1,
            task: 1,
            labels: {
                $elemMatch: {
                    worker: user_id
                }
            }
        },
        {skip, limit: 10}
    )

    return data
}

const getData = async ({data_id, user_id}) => {
    console.log('------------------------------ dari getData')
    console.log(user_id)
    const data = await db.Data.findById(data_id, {
        text: 1,
        price: 1,
        task: 1,
        labels: {
            $elemMatch: {
                worker: user_id
            }
        }
    })

    return data;
}

module.exports = {
    getMarketTasks,
    getTask,
    getUserTasks,
    getAllData,
    getData,
}