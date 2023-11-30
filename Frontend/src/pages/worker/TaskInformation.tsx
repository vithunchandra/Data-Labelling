import { AddReactionOutlined, AttachMoneyOutlined, ChevronLeft, ChevronRight } from '@mui/icons-material';
import DataArrayIcon from '@mui/icons-material/DataArray';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';
import { useTask } from './Task';
import ITask from '../../interface/ITask';
import useTracker from '../../customHooks/useTracker';
import { client } from '../../api/client';
import useAuth from '../../customHooks/authenticate';
import { AxiosError } from 'axios';

interface PassedData {
    tasks: ITask[];
    index: number;
    skip: number;
}

export default function TaskInformation(){
    const data = useLocation().state as PassedData
    const {previous, next, index, skip, items, getItem} = useTracker<ITask>({
        itemsInput: data.tasks,
        indexInput: data.index,
        skipInput: data.skip,
        fetchItem: fetchTasks
    })
    let {task, setData} = useTask()
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

    async function fetchTasks(skip: number){
        let tempTasks: ITask[] = []
        const {getToken} = useAuth()
        try{
            const response = await client.get(`worker/task`, {
                headers: {
                    Authorization: "Bearer " + getToken()
                },
                params: {
                    skip
                }
            })
            tempTasks = response.data.data as ITask[]
        }catch(err){
            if(err instanceof AxiosError){
                console.log(err.response?.data.message)
            }
        }
        return tempTasks
    }

    useEffect(() => {
        setData({
            tasks: items,
            index: index,
            skip: skip
        })
        navigate(`../task/${getItem()._id}`, {state: {
            tasks: items,
            skip,
            index
        }, relative: 'route'})
    }, [index])

    return(
        <div className="h-100 d-flex flex-column p-4 rounded-2 shadow-sm bg-white">
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
                <p>{task.task_description}</p>
            </div>
            <div className='flex-fill'></div>
            <div className="row align-items-end justify-content-end g-0">
                <div className="col-auto me-4">
                    <Button variant="contained" startIcon={<ChevronLeft />} onClick={previous}>Previous</Button>
                </div>
                <div className="col-auto">
                    <Button variant="contained" endIcon={<ChevronRight />} onClick={next}>Next</Button>
                </div>
            </div>
        </div>
    )
}