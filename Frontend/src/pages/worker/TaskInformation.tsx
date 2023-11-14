import { AddReactionOutlined, AttachMoneyOutlined, ChevronLeft, ChevronRight } from '@mui/icons-material';
import DataArrayIcon from '@mui/icons-material/DataArray';
import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom'
import tasks from '../../dummy_data/task.json'
import { Button } from '@mui/material';

export default function TaskInformation(){
    const taskIndex = parseInt(useLoaderData() as string);
    let task = tasks[taskIndex];
    const navigate = useNavigate()

    const taskData = [
        {
            icon: <DataArrayIcon sx={{fontSize: "30px"}} color="warning" className="me-2"></DataArrayIcon>,
            data: `${task.data.length} Data`
        },
        {
            icon: <AttachMoneyOutlined sx={{fontSize: "30px"}} color="success" className="me-2"></AttachMoneyOutlined>,
            data: task.price
        },
        {
            icon: <AddReactionOutlined sx={{fontSize: "30px"}} color="action" className="me-2"></AddReactionOutlined>,
            data: `${task.credibility} Credibility Score`
        }
    ]

    function previous(){
        console.log(taskIndex)
        if(taskIndex > 0){
            navigate(`../task/${taskIndex - 1}`)
        }
    }

    function next(){
        console.log(taskIndex)
        if(tasks.length - 1 > taskIndex){
            navigate(`../task/${taskIndex + 1}`)
        }
    }

    return(
        <div className="h-100 d-flex flex-column p-3 rounded-2 shadow-sm bg-white">
            <div className="fw-bold fs-4 mb-2">Task Information:</div>
            <div className="row flex-column justify-content-between mb-4 g-0">
                {
                    taskData.map((item, index) => {
                        return <div className="col-auto my-2 d-flex align-items-center" key={index}>
                            {item.icon}
                            <span className="fs-5">{item.data}</span>
                        </div>
                    })
                }
            </div>
            <div className="w-100" style={{maxHeight: '400px'}}>
                <span className='fw-bold fs-5'>Instruction: </span>
                <p>{task.instruction}</p>
            </div>
            <div className='flex-fill'></div>
            <div className="row align-items-end justify-content-end">
                <div className="col-auto">
                    <Button variant="contained" startIcon={<ChevronLeft />} onClick={previous}>Previous</Button>
                </div>
                <div className="col-auto">
                    <Button variant="contained" endIcon={<ChevronRight />} onClick={next}>Next</Button>
                </div>
            </div>
        </div>
    )
}