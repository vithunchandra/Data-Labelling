import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material';
import TaskList from '../../components/requester/TaksList';
// import task from '../../dummy_data/task.json'
import { Link, useLoaderData } from 'react-router-dom';
import useAuth from '../../customHooks/authenticate';
import { client } from '../../api/client';
import { AxiosError } from 'axios';

export default function CreateTask() {
    const task = useLoaderData();

    return (
        <div className='mb-5'>
            <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
                <div className="fw-bold fs-4 mb-2">Task</div>
                <TaskList task={task} />
            </div>
            <Link to={"add"}>
                <IconButton className='position-fixed fixed-bottom' style={{width:"7.5%", marginBottom:"0%", marginLeft:"90%"}}>
                    <AddCircleIcon sx={{fontSize: "100px"}}></AddCircleIcon>
                </IconButton>
            </Link>
        </div>
    )
}

export async function getUserTasks({params}: any){
    const {getToken} = useAuth();
    
    try{
        const response = await client.get(
            "/task/user",
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                },
                params: {
                    expand : 1
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