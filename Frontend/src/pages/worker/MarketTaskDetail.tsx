import { useLoaderData, useNavigate } from "react-router-dom";
import tasks from '../../dummy_data/task.json';
import DataArrayIcon from '@mui/icons-material/DataArray';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckIcon from '@mui/icons-material/Check';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

export default function MarketTaskDetail(){
    const [taskId, setTaskId] = useState(useLoaderData() as number);
    let task = tasks[taskId];
    const navigate = useNavigate()
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

    function previous(){
        if(taskId > 0){
            setTaskId(taskId - 1)
        }
    }

    function next(){
        if(task.data.length - 1 > taskId){
            setTaskId(taskId + 1)
        }
    }

    function cancel(){
        navigate('..', {
            relative: 'path'
        })
    }

    useEffect(() => {
        task = tasks[taskId];
    }, [taskId])

    return(
        <div className="w-100 h-100 d-flex flex-column text-capitalize shadow-sm p-3 rounded-2 bg-white">
            <div className="row justify-content-between">
                <div className="col-auto">
                    <div className="display-5 fw-bold">{task.name}</div>
                </div>
                <div className="col-auto d-flex align-items-center">
                    <div className="fs-1 fw-light text-secondary">{task.type}</div>
                </div>
            </div>
            <div className="text-secondary fs-4">{task.requester}</div>
            <div className="fs-5 mt-1">{task.start_date} - {task.finish_date}</div>
            <div className="fw-bold fs-3 mt-5 mb-2">Task Information</div>
            <div className="row flex-row justify-content-between mb-4 g-0">
                {
                    taskData.map((item, index) => {
                        return <div className="col-auto d-flex align-items-center" key={index}>
                            {item.icon}
                            <span className="fs-4">{item.data}</span>
                        </div>
                    })
                }
            </div>
            <div className="fs-5">
                <span className="fw-bold">Instruction:</span><br/>
                <p>
                    {task.instruction}
                </p>
            </div>
            <div className="row flex-fill align-items-end">
                <div className="col-auto">
                    <Button variant="contained" startIcon={<ChevronLeftIcon />} onClick={previous}>Previous</Button>
                </div>
                <div className="col d-flex justify-content-center">
                    <Button className="me-4" variant="contained" color="error" startIcon={<ClearOutlinedIcon />} onClick={cancel}>Cancel</Button>
                    <Button variant="contained" color="success" endIcon={<CheckIcon />}>Accept</Button>
                </div>
                <div className="col-auto">
                    <Button variant="contained" endIcon={<ChevronRightIcon />} onClick={next}>Next</Button>
                </div>
            </div>
        </div>
    )
}

export const loader = async ({ params } : {params: Map<string, any>}) => {
    return params['task_id'];
}