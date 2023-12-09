const mongoose = require("mongoose");
const {faker} = require('@faker-js/faker');
const { User, Task_Type, Task, Data, Chat } = require("../models");

const connection = mongoose.connect(
  "mongodb://127.0.0.1:27017/db_data_labeller",
);

mongoose.set('debug', true)

const role = ['requester', 'worker']

//User Seeder
async function userSeeder(){
    await User.deleteMany({})

    const user = [];
    for(let i=0; i<50; i++){
        const roleIndex = Math.floor(Math.random() * 2)
        user.push({
            email: faker.internet.email(),
            name: faker.person.fullName(),
            credibility: faker.number.int({min: 0, max: 100}),
            password: faker.string.alphanumeric({length: {min: 5, max: 10}}),
            role: role[roleIndex],
            wallet: faker.number.int({min: 0, max: 9999999}),
            tasks: []
        })
    }

    await User.insertMany(user)
}

async function taskTypeSeeder(){
    await Task_Type.deleteMany({})

    await Task_Type.insertMany([
        {
            name: 'Classification',
            price: 0.5
        },
        {
            name: 'AI Summary Checking',
            price: 0.5
        },
        {
            name: 'Translation',
            price: 1.5
        },
        {
            name: 'Summary',
            price: 1
        }
    ])
}

async function taskSeeder(){
    await Task.deleteMany({})

    const requester = await User.find({role: 'requester'})
    const worker = await User.find({role: 'worker'})
    const types = await Task_Type.find()
    for(let i=0; i<requester.length; i++){
        const tasks = []
        const totalTask = faker.number.int({min: 0, max: 50})
        for(let j=0; j<totalTask; j++){
            const type = types[faker.number.int({min: 0, max: 3})]
            let possible_label = []
            if(type.name === 'Classification'){
                for(let k=0; k<faker.number.int({min: 2, max: 10}); k++){
                    possible_label.push(
                        faker.word.adjective()
                    )
                }
            }
            let workerObject = [];
            for(let k=0; k<faker.number.int({min: 0, max: 20}); k++){
                const workerIndex = faker.number.int({min: 0, max: worker.length - 1})
                workerObject.push({
                    user_id: worker[workerIndex]._id,
                    chat: [],
                    isBanned: Math.random() < 0.5
                })
            }
            tasks.push({
                task_name: faker.word.noun(20),
                task_description: faker.word.words({count: {min: 10, max: 100}}),
                possible_label,
                start_date: new Date(),
                end_date: new Date(`2023-12-${faker.number.int({min: 1, max: 31})}`),
                min_credibility: faker.number.int({min: 40, max: 90}),
                requester: requester[i]._id,
                task_type: type._id,
                active: true,
                worker: workerObject,
                ban_list: [],
                data: []
            })
        }
        const results = await Task.insertMany(tasks)
        for(const result of results){
            requester[i].tasks.push(result._id)
        }
        await requester[i].save()
    }

}

async function dataSeeder(){
    await Data.deleteMany({})

    const tasks = await Task.find().populate('task_type')
    console.log(tasks[0])
    for(let i=0; i<tasks.length; i++){
        const task = tasks[i]
        const data = []
        for(let j=0; j<faker.number.int({min: 10, max: 100}); j++){
            const text = faker.word.words({count: {min: 5, max: 50}})
            data.push({
                text,
                price: text.length * task.task_type.price,
                task: task._id,
                labels: [] 
            })
        }
        const results = await Data.insertMany(data)
        for(const result of results){
            task.data.push(result._id)
        }
        await task.save()
    }
}

async function labelSeeder(){
    const tasks = await Task.find().populate('task_type')
    for(const task of tasks){
        const dataRef = task.data
        for(const datumRef of dataRef){
            const data = await Data.findById(datumRef)
            const workers = task.worker
            for(const worker of workers){
                const isLabeled = Math.random() < 0.9
                if(isLabeled){
                    let label;
                    if(task.task_type.name === 'Classification'){
                        label = task.possible_label[faker.number.int({min: 0, max: task.possible_label.length - 1})]
                    }else{
                        label = faker.word.words({count: {min: 5, max: 10}})
                    }
                    data.labels.push({
                        answer: label,
                        worker: worker.user_id
                    })
                }
            }
            await data.save()
        }
    }
}

async function chatSeeder(){
    await Chat.deleteMany({})

    const tasks = await Task.find()
    for(const task of tasks){
        const workers = task.worker
        for(const worker of workers){
            let chats = [];
            for(let i=0; i<faker.number.int({min: 5, max: 50}); i++){
                const {user, targetUser} = Math.random() < 0.5 ? {user: worker.user_id, targetUser: task.requester} : {user: task.requester, targetUser: worker.user_id}
                chats.push({
                    user,
                    targetUser,
                    task_id: task._id,
                    text_chat: faker.word.words({count: {min: 1, max: 15}}),
                    is_read: Math.random() < 0.5
                })
            }
            const results = await Chat.insertMany(chats)
            for(const result of results) {
                worker.chat.push(result._id)
            }
        }
        await task.save()
    }
}

async function seedAll(){
    await userSeeder()
    await taskTypeSeeder()
    await taskSeeder()
    await dataSeeder()
    await labelSeeder()
    await chatSeeder()

    console.log('Data seeded successfully')

    process.exit()
}

seedAll()