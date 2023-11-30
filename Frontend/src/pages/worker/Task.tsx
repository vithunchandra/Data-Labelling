import { Outlet, useLoaderData, useLocation, useOutletContext } from 'react-router-dom';
import { ChatOutlined, InfoOutlined, List } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import Chat from '../../components/worker/Chat';
import users from '../../dummy_data/user.json';
import chats from '../../dummy_data/chat_2.json';
import useAuth from '../../customHooks/authenticate';
import { AxiosError } from 'axios';
import ITask from '../../interface/ITask';
import { client } from '../../api/client';
import { useState } from 'react';
import { ITracker } from '../../customHooks/useTracker';
import { IData } from '../../interface/IData';

interface ContextType{
    task: ITask;
    setData: React.Dispatch<React.SetStateAction<PassedData>>;
    dataTracker: ITracker<IData>
    setDataTracker: React.Dispatch<React.SetStateAction<ITracker<IData> | undefined>>
}

interface PassedData {
    tasks: ITask[];
    index: number;
    skip: number;
}

export default function TaskDetail(){
    const [data, setData] = useState<PassedData>(useLocation().state as PassedData)
    const user = users[1];
    const targetUser = users[0]
    const [isChatActive, setIsChatActive] = useState(true)
    const [dataTracker, setDataTracker] = useState<ITracker<IData> | undefined>(undefined)
    let task = useLoaderData() as ITask

    return(
        <div className='w-100 h-100'>
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
                                <Link to={'./'} state={data}>
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
                    
                    <div className='w-100 my-3 flex-fill overflow-y-auto'>
                        <Outlet context={{task, setData, dataTracker, setDataTracker}} />
                    </div>
                </div>

                <div className='col-auto h-100'>
                    {/* <Collapse orientation='horizontal' in={isChatActive}>
                        <div id='chat-wrapper'>
                            <div className='chat'></div>
                        </div>
                    </Collapse> */}
                    <div id='chat-wrapper' className='collapse collapse-horizontal h-100 show'>
                        <div id='chat' className='h-100 ms-4'>
                            <Chat user={user} targetUser={targetUser} chats={chats}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function useTask(){
    return useOutletContext<ContextType>()
}

export const taskDetailLoader = async ({params} : any) => {
    const task_id = params['task_id']
    const {getToken} = useAuth()
    let task: ITask | undefined;
    try{    
        const response = await client.get(`worker/task/${task_id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
        task = response.data.data
    }catch(err){
        if(err instanceof AxiosError){
            console.log(err.response?.data.message)
        }
    }
    return task
}