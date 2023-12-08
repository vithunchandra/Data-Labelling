import { useLoaderData } from 'react-router-dom';
import TaskTable from '../../components/requester/TaskTable'
import useAuth from '../../customHooks/authenticate';
import { client } from '../../api/client';
import { AxiosError } from 'axios';
// import task from '../../dummy_data/task.json'

export default function MonitorTask() {
    const task = useLoaderData();

    return (
        <div>
            <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
                <div className="fw-bold fs-4 mb-2">Task</div>
                <TaskTable task={task} />
            </div>
        </div>
    )
}

export async function ToggleTaskAction ({request, params} : {request: any, params: any}) {    
    const formData = await request.formData();
    const _id = formData.get("_id");
    const {getToken} = useAuth();

    try{
        const response = await client.post(
            "/task/toggle_active/",
            {task_id: _id},
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }
        )
        
        return response.data
    }catch(err){
        if(err instanceof AxiosError){
            return console.log(err.response?.data.message)
        }
        return console.log(err)
    }
}