import { useEffect, useState } from 'react'
import tasks from '../../dummy_data/task.json'
import { useLoaderData } from 'react-router-dom';
import DataArrayIcon from '@mui/icons-material/DataArray';
import { AddReactionOutlined, AttachMoneyOutlined, ChevronLeft, ChevronRight, List } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function TaskDetail(){
    const [taskIndex, setTaskIndex] = useState(parseInt(useLoaderData() as string));
    let task = tasks[taskIndex];
    console.log(task)
    console.log(taskIndex)

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
        if(taskIndex > 0){
            setTaskIndex(taskIndex - 1)
        }
    }

    function next(){
        if(task.data.length - 1 > taskIndex){
            setTaskIndex(taskIndex + 1)
        }
    }
    
    useEffect(() => {
        task = tasks[taskIndex];
    }, [taskIndex])

    return(
        <div className='w-100 h-100'>
            <div className='row h-100'>
                <div className='col w-100 h-100 d-flex flex-column me-2 text-capitalize'>
                    <div className='w-100 p-3 rounded-2 shadow-sm bg-white'>
                        <div className='row justify-content-between align-items-center'>
                            <div className='col-auto display-6 fw-bold'>{task.name}</div>
                            <div className='col-auto fs-3 text-secondary'>{task.type}</div>
                        </div>
                        <div className='col-auto fs-4 text-secondary'>{task.requester}</div>
                        <div className='col-auto'><div>{task.start_date} - {task.finish_date}</div></div>
                    </div>
                    
                    <div className='w-100 mt-4 p-3 rounded-2 shadow-sm bg-white'>
                        <div className="fw-bold fs-4 mb-2">Task Information</div>
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
                    
                    <div className='w-100 flex-fill'></div>

                    <div className="row align-items-end">
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
                    </div>
                </div>

                <div className='col-4 p-2 rounded-2 shadow-sm bg-white '>
                   
                </div>
            </div>
        </div>
    )
}

export function taskDetailLoader({params} : {params: Map<string, any>}){
    return params['task_id']
}