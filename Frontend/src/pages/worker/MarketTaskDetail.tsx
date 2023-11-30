import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import DataArrayIcon from '@mui/icons-material/DataArray';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckIcon from '@mui/icons-material/Check';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Button } from "@mui/material";
import { client } from "../../api/client";
import { AxiosError } from "axios";
import ITask from "../../interface/ITask";
import useAuth from "../../customHooks/authenticate";
import useTracker from "../../customHooks/useTracker";
import { useEffect } from "react";

interface PassedData {
    tasks: ITask[];
    index: number;
    skip: number;
}

export default function MarketTaskDetail(){
    const data = useLocation().state as PassedData
    const {previous, next, index, skip, items, getItem} = useTracker({
        indexInput: data.index,
        skipInput: data.skip,
        itemsInput: data.tasks,
        fetchItem: fetchTasks
    })
    const task = useLoaderData() as ITask
    const navigate = useNavigate()
    const taskData = [
        {
            icon: <DataArrayIcon sx={{fontSize: "40px"}} color="warning" className="me-2"></DataArrayIcon>,
            data: `${task.data.length} Data`
        },
        {
            icon: <AttachMoneyIcon sx={{fontSize: "40px"}} color="success" className="me-2"></AttachMoneyIcon>,
            data: task.task_type.price
        },
        {
            icon: <AddReactionOutlinedIcon sx={{fontSize: "40px"}} color="action" className="me-2"></AddReactionOutlinedIcon>,
            data: `${task.min_credibility} Credibility Score`
        }
    ]

    async function fetchTasks(skip: number){
        let tempTasks: ITask[] = []
        const {getToken} = useAuth()
        try{
            const response = await client.get(`worker/marketplace`, {
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

    // async function previous(){
    //     if(taskIndex > 0){
    //         taskIndex--;
    //     }else{
    //         if(skip === 0){
    //             return
    //         }

    //         skip -= 10
    //         tasks = await fetchTasks()
    //         taskIndex = tasks.length - 1
    //     }

    //     navigate(`../marketplace/${tasks[taskIndex]._id}`, {state: {
    //         tasks,
    //         skip,
    //         index: taskIndex
    //     }})
    // }

    // async function next(){
    //     if(tasks.length - 1 > taskIndex){
    //         taskIndex++;
    //     }else{
    //         skip += 10
    //         const newTasks = await fetchTasks()
    //         if(newTasks.length <= 0){
    //             skip -= 10;
    //             return
    //         }else{
    //             tasks = newTasks;
    //         }
    //         taskIndex = 0
    //     }

    //     navigate(`../marketplace/${tasks[taskIndex]._id}`, {state: {
    //         tasks,
    //         skip,
    //         index: taskIndex
    //     }})
    // }

    function cancel(){
        navigate('..', {
            relative: 'path'
        })
    }

    useEffect(() => {
        navigate(`../marketplace/${getItem()._id}`, {state: {
            tasks: items,
            skip,
            index
        }})
    }, [index])

    return(
        <div className="w-100 h-100 d-flex flex-column text-capitalize shadow-sm p-3 rounded-2 bg-white">
            <div className="row justify-content-between">
                <div className="col-auto">
                    <div className="display-5 fw-bold">{task.task_name}</div>
                </div>
                <div className="col-auto d-flex align-items-center">
                    <div className="fs-1 fw-light text-secondary">{task.task_type.name}</div>
                </div>
            </div>
            <div className="text-secondary fs-4">{task.requester.name}</div>
            <div className="fs-5 mt-1">{task.start_date} - {task.end_date}</div>
            <div className="fw-bold fs-3 mt-5 mb-2">Task Information</div>
            <div className="row flex-row justify-content-between mb-4 g-0">
                {
                    taskData.map((item, index) => {
                        return <div className="col-auto d-flex align-items-center" key={index}>
                            {item.icon}
                            <span className="fs-4">{item.data as number}</span>
                        </div>
                    })
                }
            </div>
            <div className="fs-5">
                <span className="fw-bold">Instruction:</span><br/>
                <p>
                    {task.task_description}
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

export const marketTaskDetailLoader = async ({ params } : any) => {
    const task_id: string = params['task_id'];
    const {getToken} = useAuth()
    let task: ITask | undefined;
    try{
        const response = await client.get(`/worker/marketplace/${task_id}`, {
            headers: {
                Authorization: "Bearer " + getToken()
            },
        })
        task = response.data.data as ITask
    }catch(err){
        if(err instanceof AxiosError){
            console.log(err.response?.data.message)
        }
    }
    return task;
}