import { AxiosError } from "axios";
import { client } from "../../api/client";
import TaskTable from "../../components/worker/TaskTable";
import ITask from "../../interface/ITask";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../customHooks/authenticate";
export default function Marketplace(){
    const tasks = useLoaderData() as ITask[]
    return(
        
        <>
            <div className="w-100 bg-white p-5 rounded-4 shadow-sm">
                <TaskTable task={tasks}></TaskTable>
            </div>
        </>    
    )
}

export async function marketplaceLoader(){
    const {getToken} = useAuth()
    let tasks
    try{
        const response = await client.get('/worker/marketplace', {
            headers: {
                Authorization: "Bearer " + getToken()
            },
            params: {
                skip: 0
            }
        });
        tasks = response.data.data;
    }catch(err: unknown){
        console.log(err)
        if(err instanceof AxiosError){
            console.log(err.response?.data.message)
        }
    }
    return tasks as ITask[];
}