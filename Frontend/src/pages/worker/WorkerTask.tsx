import Filters from "../../components/worker/Filters"
import TaskTable from "../../components/worker/TaskTable"
import { client } from "../../api/client"
import useAuth from "../../customHooks/authenticate"
import ITask from "../../interface/ITask"
import { AxiosError } from "axios"
import { useLoaderData } from "react-router-dom"
import ITaskType from "../../interface/ITaskType"
import PageNavigationButton from "../../components/worker/pageNavigation"

interface ILoader{
    tasks: ITask[];
    page: number;
    totalPages: number;
    types: ITaskType[];
}

export default function WorkerTask(){
    const { tasks, page, totalPages, types } = useLoaderData() as ILoader

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
                <div className="text-end">
                    <PageNavigationButton page={page} totalPages={totalPages} baseUrl="../task"/>
                </div>
            </div>
        </div>
    )
}

export const workerTaskLoader = async ({request}: any) => {
    const {getToken} = useAuth()
    const url = new URL(request.url)
    const page = url.searchParams.get('page') !== null ? parseInt(url.searchParams.get('page')!) : 1
    try{
        let loaderObject = {}
        let response = await client.get(`/worker/task`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            },
            params: {page}
        })
        loaderObject = {...response.data}
        
        response = await client.get('/task_type')
        loaderObject['types'] = response.data
        loaderObject['page'] = page

        return loaderObject as ILoader
    }catch(err){
        if(err instanceof AxiosError){
            return console.log(err.response?.data.message)
        }
        return console.log(err)
    }
}