const db = require("../../models")

const getMarketTasks = async ({user_id, skip}) => {
    console.log(user_id)
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

const getMarketTask = async ({task_id}) => {
    const task = await db.Task.findById(
        task_id,
        {
            worker: 0,
            ban_list: 0
        }
    ).populate('requester')
    .populate('task_type')
    .populate('data')

    return task
}

module.exports = {
    getMarketTasks,
    getMarketTask
}