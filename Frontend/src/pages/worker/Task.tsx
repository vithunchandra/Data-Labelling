import { Outlet, useLoaderData, useOutletContext } from 'react-router-dom';
import { ChatOutlined, InfoOutlined, List } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import Chat from '../../components/worker/Chat';
import useAuth from '../../customHooks/authenticate';
import { AxiosError } from 'axios';
import ITask from '../../interface/ITask';
import { client } from '../../api/client';
import { useState } from 'react';

interface ILoader{
    task: ITask;
    prev: ITask | undefined;
    next: ITask | undefined;
    query: string;
}

export default function TaskDetail(){
    const {task, prev, next, query} = useLoaderData() as ILoader
    
    const { getUser } = useAuth()
    const [isChatActive, setIsChatActive] = useState(true)

    return(
        <div className='row h-100 g-0'>
            <div className='col w-100 h-100 d-flex flex-column text-capitalize'>
                <div className='w-100 py-2 px-3 rounded-2 shadow-sm bg-white'>
                    <div className='row justify-content-between align-items-center g-0'>
                        <div className='col-auto fs-2 fw-bold'>{task.task_name}</div>
                        <div className='col-auto'>
                            <Link to={'./viewdata'}>
                                <IconButton color='warning'>
                                    <List />
                                </IconButton>
                            </Link>
                            <Link to={`./`}>
                                <IconButton color='primary'>
                                    <InfoOutlined/>
                                </IconButton>
                            </Link>
                            <IconButton color='success' onClick={() => setIsChatActive(!isChatActive)} data-bs-toggle="collapse" data-bs-target="#chat-wrapper">
                                <ChatOutlined />
                            </IconButton>
                        </div>
                    </div>
                    <div className='row justify-content-between align-items-center g-0'>
                        <div className='col-auto fs-5 text-secondary'>{task.requester.name}</div>
                        <div className='col-auto fs-5 text-secondary'>{task.task_type.name}</div>
                    </div>
                </div>
                
                <div className='w-100 my-3 flex-fill' style={{minHeight: '0'}}>
                    <Outlet context={{task, prev, next, query}} />
                </div>
            </div>

            <div className='col-auto h-100'>
                <div id='chat-wrapper' className='collapse collapse-horizontal h-100 show'>
                    <div id='chat' className='h-100 ms-4'>
                        <Chat task_id={task._id} requester_id={task.requester._id} user_id={getUser()._id}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function useTask(){
    return useOutletContext<ILoader>()
}

export async function taskDetailLoader({params, request}: any){
    const task_id = params['task_id']
    const url = new URL(request.url)

    const typeParam = url.searchParams.get('type')
    const startDateParam = url.searchParams.get('startDate')
    const nameParam = url.searchParams.get('name')

    let filters = {}
    filters['type'] = typeParam !== null ? typeParam : ''
    filters['startDate'] = startDateParam !== null ? startDateParam : undefined
    filters['name'] = nameParam !== null ? nameParam : ''

    let query = ''
    for(const key in filters){
        if(filters[key]){
            query += '&' + key + '=' + filters[key]
        }
    }
    
    const {getToken} = useAuth()
    try{
        const response = await client.get(`worker/task/${task_id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            },
            params: {...filters}
        })
        console.log(response.data)
        return {...response.data, query} as ILoader
    }catch(err){
        if(err instanceof AxiosError){
            console.log(err.response?.data.message)
        }else{
            console.log(err)
        }
        return null
    }
}