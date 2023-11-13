import { AddReactionOutlined, AttachMoneyOutlined } from '@mui/icons-material';
import DataArrayIcon from '@mui/icons-material/DataArray';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom'
import tasks from '../../dummy_data/task.json'

export default function TaskInformation(){
    const [taskIndex, setTaskIndex] = useState(parseInt(useLoaderData() as string));
    let task = tasks[taskIndex];

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

    return(
        <div className="p-3 rounded-2 shadow-sm bg-white">
            <div className="fw-bold fs-4 mb-2">Task Information:</div>
            <div className="row flex-row justify-content-between mb-4 g-0">
                {
                    taskData.map((item, index) => {
                        return <div className="col-auto d-flex align-items-center" key={index}>
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
        </div>
    )
}