import { AddReactionOutlined, AttachMoneyOutlined, ChevronLeft, ChevronRight } from '@mui/icons-material';
import DataArrayIcon from '@mui/icons-material/DataArray';
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';
import { useTask } from './Task';

export default function TaskInformation(){
    const {task, prev, next, query} = useTask()
    const navigate = useNavigate()
    const taskData = [
        {
            icon: <DataArrayIcon sx={{fontSize: "30px"}} color="warning" className="me-2"></DataArrayIcon>,
            data: `${task.data.length} Data`
        },
        {
            icon: <AttachMoneyOutlined sx={{fontSize: "30px"}} color="success" className="me-2"></AttachMoneyOutlined>,
            data: task.task_type.price
        },
        {
            icon: <AddReactionOutlined sx={{fontSize: "30px"}} color="action" className="me-2"></AddReactionOutlined>,
            data: `${task.min_credibility} Credibility Score`
        }
    ]

    return(
        <div className="h-100 d-flex flex-column p-4 rounded-2 shadow bg-white">
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
            <div className="w-100 overflow-auto" style={{maxHeight: '200px'}}>
                <span className='fw-bold fs-5'>Instruction: </span>
                <p>{task.task_description}{task.task_description}</p>
            </div>
            <div className='flex-fill'></div>
            <div className="row align-items-end justify-content-end g-0">
                <div className="col-auto me-4">
                    <Button className={`${!prev ? 'invisible' : ''}`} variant="contained" 
                        startIcon={<ChevronLeft />} 
                        onClick={() => navigate(`../task/${prev?._id}?${query}`, {replace: true})}
                    >Previous</Button>
                </div>
                <div className="col-auto">
                    <Button className={`${!next ? 'invisible' : ''}`} variant="contained" 
                        endIcon={<ChevronRight />} 
                        onClick={() => navigate(`../task/${next?._id}?${query}`, {replace: true})}
                    >Next</Button>
                </div>
            </div>
        </div>
    )
}

