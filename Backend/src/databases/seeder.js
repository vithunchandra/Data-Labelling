const mongoose = require("mongoose");
const {faker} = require('@faker-js/faker');
const { User, Task_Type, Task, Data } = require("../models");

const connection = mongoose.connect(
  "mongodb://127.0.0.1:27017/db_data_labeller",
);

mongoose.set('debug', true)

const role = ['requester', 'worker']

//User Seeder
async function userSeeder(){
    const user = [];
    for(let i=0; i<20; i++){
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

    await User.create(user)
}

async function taskTypeSeeder(){
    await Task_Type.create([
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
    const requester = await User.find({role: 'requester'})
    const worker = await User.find({role: 'worker'})
    const types = await Task_Type.find()
    const tasks = []
    for(let i=0; i<requester.length; i++){
        const totalTask = faker.number.int({min: 0, max: 5})
        for(let j=0; j<totalTask; j++){
            const type = types[faker.number.int({min: 0, max: 3})]
            let possible_label = []
            if(type.name === 'Classification'){
                for(let k=0; k<faker.number.int({min: 1, max: 10}); k++){
                    possible_label.push(
                        faker.word.adjective()
                    )
                }
            }
            let workerObject = [];
            for(let k=0; k<faker.number.int({min: 0, max: 5}); k++){
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
    }

    await Task.create(tasks)
}

async function dataSeeder(){
    const tasks = await Task.find().populate('task_type')
    console.log(tasks[0])
    for(let i=0; i<tasks.length; i++){
        const task = tasks[i]
        for(let j=0; j<faker.number.int({min: 0, max: 10}); j++){
            const text = faker.word.words({count: {min: 5, max: 20}})
            const data = await Data.create({
                text,
                price: text.length * task.task_type.price,
                task: task._id,
                labels: [] 
            })
            task.data.push(data._id)
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
                const isLabeled = Math.random() < 0.5
                if(isLabeled){
                    let label;
                    if(task.task_type.name === 'Classification'){
                        label = task.possible_label[faker.number.int({min: 0, max: task.possible_label.length - 1})]
                    }else{
                        label = faker.word.words({count: {min: 5, max: 10}})
                    }
                    data.labels.push({
                        answer: label,
                        worker: worker._id
                    })
                }
            }
            await data.save()
        }
    }
}

async function seedAll(){
    await userSeeder()
    await taskTypeSeeder()
    await taskSeeder()
    await dataSeeder()
    await labelSeeder()

    console.log('Data seeded successfully')

    process.exit()
}

seedAll()