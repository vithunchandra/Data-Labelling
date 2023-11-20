import { useState } from 'react';
import tasks from '../../dummy_data/task.json'
import { Outlet, useLoaderData } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Chat() {
    const Req_tasks = tasks.filter((item) => item.requester == "vithun chandra");
    const[task, setTask] = useState(Req_tasks[parseInt(useLoaderData() as string)]);

    return (
        <div className='row d-flex bg-white shadow-sm w-100 h-100'>
            <div className='col-3 overflow-auto'>
                <div className='p-3 fs-3 fw-bold border-bottom border-black border-3 text-end'>WORKERS</div>
                {
                    task.workers.map((item, index) => {
                        return (
                            <Link to={item} key={index} className='text-dark link-underline-light'>
                                <div className='p-3 border-bottom border-1 d-flex align-items-center'>
                                    <Avatar src="/static/images/avatar/1.jpg"></Avatar>
                                    <label className='ms-4'>{item}</label>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
            <div className='h-100 col-9 border-start border-2 border-black'>
                <Outlet />
            </div>
        </div>
    )
}