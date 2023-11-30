import Filters from "../../components/worker/Filters"
import { TaskType } from "../../enum/TaskType"
import TaskTable from "../../components/worker/TaskTable"
import { client } from "../../api/client"
import useAuth from "../../customHooks/authenticate"
import ITask from "../../interface/ITask"
import { AxiosError } from "axios"
import { useLoaderData } from "react-router-dom"
import ITaskType from "../../interface/ITaskType"

interface ILoaderData{
    tasks: ITask[];
    types: ITaskType[];
}

export default function WorkerTask(){
    const { tasks, types } = useLoaderData() as ILoaderData 

    return(
        <div className="w-100">
            <div className="row align-items-center g-0 justify-content-between bg-white rounded-2 p-2 shadow-sm fs-3">
                <div className="col-auto">
                    Your Progress
                </div>
                <div className="col-auto d-flex align-items-center">
                    <span className="text-primary fw-bold me-2">12/50</span>
                    <span>Task</span>
                </div>
            </div>

            <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
                <Filters taskType={types}></Filters>
            </div>

            <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
                <TaskTable task={tasks} />
            </div>  
        </div>
    )
}

export const workerTaskLoader = async () => {
    const {getToken} = useAuth()
    let tasks = []
    let types = []
    try{
        let response = await client.get(`/worker/task`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
        tasks = response.data.data
        
        response = await client.get('/task_type')
        types = response.data
    }catch(err){
        if(err instanceof AxiosError){
            console.log(err.response?.data.message)
        }
    }
    return {tasks, types} as {tasks: ITask[], types: TaskType[]}
}