import { useState } from 'react';
import tasks from '../../dummy_data/task.json'
import { useLoaderData } from 'react-router-dom';
import ListLabel from '../../components/requester/ListLabel';
import DataArrayIcon from '@mui/icons-material/DataArray';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import PublishIcon from '@mui/icons-material/Publish';
import { Button, Chip } from '@mui/material';

export default function DetailTask(){
    const Req_tasks = tasks.filter((item) => item.requester == "vithun chandra");
    const[task, setTask] = useState(Req_tasks[parseInt(useLoaderData() as string)]);

    const taskData = [
        {
            icon: <DataArrayIcon sx={{fontSize: "40px"}} color="warning" className="me-2"></DataArrayIcon>,
            data: `${task.data.length} Data`
        },
        {
            icon: <AttachMoneyIcon sx={{fontSize: "40px"}} color="success" className="me-2"></AttachMoneyIcon>,
            data: task.price
        },
        {
            icon: <AddReactionOutlinedIcon sx={{fontSize: "40px"}} color="action" className="me-2"></AddReactionOutlinedIcon>,
            data: `${task.credibility} Credibility Score`
        }
    ]

    return (
        <>
            <div className="w-100 text-end mb-3">
                {task.status ? 
                    <Button variant="contained" startIcon={<UnpublishedIcon />} color="error" size='large'>Close</Button>
                    :
                    <Button variant="contained" startIcon={<PublishIcon />} color="success" size='large'>Open</Button>
                }
            </div>
            <div className="w-100 d-flex flex-column text-capitalize shadow-sm p-3 rounded-2 bg-white">
                <div className="row justify-content-between">
                    <div className="col-auto">
                        <div className="display-6 fw-bold">{task.name}</div>
                    </div>
                    <div className="col-auto d-flex align-items-center">
                        <div className="fs-2 fw-light text-secondary">{task.type}</div>
                    </div>
                </div>
                <div className="fs-5 mt-1">{task.start_date} - {task.finish_date}</div>
                <div className="fw-bold fs-4 mt-4">Task Information</div>
                <div className="w-75 row flex-row justify-content-between mb-4 g-0">
                    {
                        taskData.map((item, index) => {
                            return <div className="col-auto d-flex align-items-center" key={index}>
                                {item.icon}
                                <span className="fs-5">{item.data}</span>
                            </div>
                        })
                    }
                </div>
                <div className="fs-5">
                    <span className="fw-bold">Instruction:</span><br/>
                    <p className='fs-6 ps-4'>
                        {task.instruction}
                    </p>
                </div>
            </div>

            <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
                {
                    task.data.map((item, index) => {
                        return (
                            <div className='w-100 mb-2 border p-3 rounded'>
                                <div className='w-100 d-flex justify-content-betweeen'>
                                    <label className='w-100 fs-5 fw-bold' data-bs-toggle="collapse" data-bs-target={"#label_"+index} role='button'>Data:</label>
                                    <Chip label={item.status} variant="filled" />
                                </div>
                                <label className='w-100 fs-6 ps-4' data-bs-toggle="collapse" data-bs-target={"#label_"+index} role='button'>{item.data}</label>
                                <div id={"label_"+index} className='collapse'>
                                    <ListLabel label={item.labels} key={index} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export function taskMonitorLoader({params} : {params: Map<string, any>}){
    return params['task_id']
}