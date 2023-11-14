import { useEffect, useState } from 'react'
import tasks from '../../dummy_data/task.json'
import { Outlet, useLoaderData } from 'react-router-dom';
import { ChatOutlined, ChevronLeft, ChevronRight, InfoOutlined, List } from '@mui/icons-material';
import { Button, Collapse, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import Chat from '../../components/worker/Chat';
import users from '../../dummy_data/user.json';
import chats from '../../dummy_data/chat_2.json';

export default function TaskDetail(){
    const user = users[1];
    const targetUser = users[0];
    const taskIndex = parseInt(useLoaderData() as string);
    const [isChatActive, setIsChatActive] = useState(true);
    let task = tasks[taskIndex];

    return(
        <div className='w-100 h-100'>
            <div className='row h-100 g-0'>
                <div className='col w-100 h-100 d-flex flex-column text-capitalize'>
                    <div className='w-100 py-2 px-3 rounded-2 shadow-sm bg-white'>
                        <div className='row justify-content-between align-items-center g-0'>
                            <div className='col-auto fs-2 fw-bold'>{task.name}</div>
                            <div className='col-auto'>
                                <Link to={'./viewdata'}>
                                    <IconButton color='warning'>
                                        <List />
                                    </IconButton>
                                </Link>
                                <Link to={'./'}>
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
                            <div className='col-auto fs-5 text-secondary'>{task.requester}</div>
                            <div className='col-auto fs-5 text-secondary'>{task.type}</div>
                        </div>
                    </div>
                    
                    <div className='w-100 my-3 flex-fill overflow-y-auto'>
                        <Outlet />
                    </div>

                    {/* <div className="row align-items-end">
                        <div className="col-auto">
                            <Button variant="contained" startIcon={<ChevronLeft />} onClick={previous}>Previous</Button>
                        </div>
                        <div className="col d-flex justify-content-center">
                            <Link to="viewdata">
                                <Button variant='contained' endIcon={<List />}>View Data</Button>
                            </Link>
                        </div>
                        <div className="col-auto">
                            <Button variant="contained" endIcon={<ChevronRight />} onClick={next}>Next</Button>
                        </div>
                    </div> */}
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

export function taskDetailLoader({params} : {params: Map<string, any>}){
    return params['task_id']
}