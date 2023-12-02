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
            limit: 10,
            sort: {
                _id: 1
            }
        }
    ).populate('requester')
    .populate('task_type')

    return tasks
}

const getMarketTask = async ({task_id, user_id}) => {
    const task = await db.Task.findOne(
        {
            _id: task_id,
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
            sort: { _id: 1}
        }
    ).populate('requester')
    .populate('task_type')
    
    return task
}

const getNearMarketTask = async ({task_id, user_id, direction}) => {
    let comparator = '$lt'
    let sort = -1

    if(direction === 'next'){
        comparator = '$gt'
        sort = 1
    }
    const task = await db.Task.findOne(
        {   
            _id: {[comparator]: task_id},
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
            ban_list: 0,
        },
        {
            sort: {_id: sort},
            limit: 1
        }
    ).populate('requester')
    .populate('task_type')

    return task
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
            limit: 10,
            sort: {_id: 1}
        }
    ).populate('requester')
    .populate('task_type')
    
    return tasks;
}

const getTask = async ({task_id, user_id}) => {
    const task = await db.Task.findOne(
        {
            _id: task_id,
            worker: {
                $elemMatch: {
                    user_id
                }
            }
        },
        {
            worker: 0,
            ban_list: 0
        },
        {
            sort: {
                _id: 1
            }
        }
    ).populate('requester')
    .populate('task_type')
    
    return task
}

const getNearTask = async ({task_id, user_id, direction}) => {
    let comparator = '$lt'
    let sort = -1

    if(direction === 'next'){
        comparator = '$gt'
        sort = 1
    }
    const task = await db.Task.findOne(
        {   
            _id: {[comparator]: task_id},
            worker: {
                $elemMatch: {
                    user_id
                }
            }
        },
        {
            worker: 0,
            ban_list: 0,
        },
        {
            sort: {_id: sort},
            limit: 1
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
        {skip, limit: 10, sort: {_id: 1}}
    )

    return data
}

const getData = async ({data_id, user_id}) => {
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

const getNearData = async ({task_id, data_id, user_id, direction}) => {
    let comparator = '$lt'
    let sort = -1
    if(direction === 'next'){
        comparator = '$gt'
        sort = 1
    }

    const data = await db.Data.findOne(
        {
            task: task_id,
            _id: {[comparator]: data_id}
        },
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
        {
            sort: {_id: sort},
            limit: 1
        }
    )

    return data
}

const storeLabel = async ({data_id, label_id, label}) => {
    const data = await db.Data.findById(data_id)
    const labelObject = data.labels.id(label_id)
    if(labelObject === null){
        data.labels.push(label)
    }else{
        labelObject.answer = label.answer
    }
    
    await data.save()
    return data
}

module.exports = {
    getMarketTasks,
    getMarketTask,
    getNearMarketTask,
    getTask,
    getNearTask,
    getUserTasks,
    getAllData,
    getData,
    getNearData,
    storeLabel
}