    import { useState } from 'react';
// import tasks from '../../dummy_data/task.json'
import { Outlet, useLoaderData } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Chat() {
    // const Req_tasks = tasks.filter((item) => item.requester == "vithun chandra");
    const[task, setTask] = useState(useLoaderData()[0]);
    // console.log(task);

    return (
        <div className='row d-flex bg-white shadow-sm w-100 h-100'>
            <div className='col-3 overflow-auto'>
                <div className='p-3 fs-3 fw-bold border-bottom border-black border-3 text-end'>WORKERS</div>
                {
                    task.worker.map((item, index) => {
                        return (
                            <Link to={item.user._id} key={index} className='text-dark link-underline-light'>
                                <div className='p-3 border-bottom border-1 d-flex align-items-center text-truncate'>
                                    <Avatar src={"https://picsum.photos/200?random="+item.user._id}></Avatar>
                                    <label className='ms-4'>{item.user.name}</label>
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