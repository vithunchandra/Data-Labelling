import { useLoaderData, useNavigate } from 'react-router-dom';
import tasks from '../../dummy_data/task.json'
import DataList from '../../components/requester/DataList';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DoneIcon from '@mui/icons-material/Done';
import { IconButton, Button, Chip } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import Data from '../../interface/DataInterface';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import useAuth from '../../customHooks/authenticate';
import { client } from '../../api/client';
import { AxiosError } from 'axios';

export default function EditTask() {
    // const tmp = useLoaderData()[0];
    // console.log(tmp);
    
    // const Req_tasks = tasks.filter((item) => item.requester == "vithun chandra");
    // const[task, setTask] = useState(Req_tasks[parseInt(useLoaderData() as string)]);
    const[task, setTask] = useState(useLoaderData()[0]);
    console.log(task);
    
    const[datas, setData] = useState<Data[]>(task.data);
    const[editIndex, setEditIndex] = useState<{index:number, action:string}>({index: -1, action : ""});
    const[editName, setEditName] = useState<boolean>(false);
    const[editCredibility, setEditCredibility] = useState<boolean>(false);
    const[editIntruction, setEditIntruction] = useState<boolean>(false);
    
    const {register, handleSubmit, reset} = useForm();
    const navigate = useNavigate()

    return (
        <form onSubmit={handleSubmit(data => {
            if(data.name){
                setEditName(false)
                const temp = task;
                temp.name = data.name;
                setTask(temp);
            }else if(data.credibility){
                setEditCredibility(false)
                const temp = task;
                temp.credibility = data.credibility;
                setTask(temp);
            }else if(data.instruction){
                setEditIntruction(false)
                const temp = task;
                temp.instruction = data.instruction;
                setTask(temp);
            }else if(data.data){
                if(editIndex.action == "save"){
                    const temp = datas.slice();
                    temp[editIndex.index].data = data.data[editIndex.index]
                    setData(temp)
                    setEditIndex({index: -1, action : ""})
                }else if(editIndex.action == "delete"){
                    const temp = datas.slice();
                    temp.splice(editIndex.index, 1)
                    setData(temp)
                    setEditIndex({index: -1, action : ""})
                }
            }else if(!data.name && !data.credibility && !data.instruction && !data.data){
                console.log("Save All");
                navigate("..",{
                    relative: "path"
                })
            }
            reset()
            console.log(data);
        })}>
            <div className='d-flex justify-content-between'>
            <Button color='info' variant='contained' startIcon={<ArrowBackIosIcon />} onClick={() => navigate("..", {relative: "path"})}>Back</Button>
                <Button startIcon={<SaveIcon />} variant='contained' color='success' size='large' type='submit'>
                    Save
                </Button>
            </div>
            <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
                {editName ?
                    <div className='d-flex align-items-center'>
                        <input type='text' defaultValue={task.task_name} {...register("name")} />
                        <Button type='submit'>
                            <DoneIcon fontSize='medium'></DoneIcon>
                        </Button>
                    </div>
                    :
                    <div className='d-flex align-items-center'>
                        <div className="fw-bold fs-4 mb-2">{task.task_name}</div>
                        <IconButton type="reset" onClick={() => {
                            setEditName(true)
                        }}>
                            <EditNoteIcon fontSize='medium'></EditNoteIcon>
                        </IconButton>
                    </div>
                }
                <div className="fs-6 mb-2">Task Type : {task.task_type[0].name}</div>
                {editCredibility ?
                    <div className='d-flex align-items-center'>
                        <div className="fs-6 mb-2">Credibility : &nbsp;</div>
                        <input type='number' max={100} min={0} defaultValue={task.min_credibility} {...register("credibility")} />
                        <Button type='submit'>
                            <DoneIcon fontSize='medium'></DoneIcon>
                        </Button>
                    </div>
                    :
                    <div className='d-flex align-items-center'>
                        <div className="fs-6 mb-2">Credibility : {task.min_credibility}</div>
                        <IconButton type='button' onClick={() => {
                            setEditCredibility(true)
                        }}>
                            <EditNoteIcon fontSize='medium'></EditNoteIcon>
                        </IconButton>
                    </div>
                }
                {editIntruction ?
                    <div className='row'>
                        <div className='col-11 d-flex align-items-start'>
                            <div className="col-1 fs-6 mb-2">Instruction : </div>
                            <div className="col-11 fs-6 mb-2">
                                <textarea defaultValue={task.task_description} {...register("instruction")} style={{width:"100%", height:"100px", resize:"none"}}></textarea>
                            </div>
                        </div>
                        <div className='col-1 d-flex align-items-center'>
                            <Button type='submit'>
                                <DoneIcon fontSize='medium'></DoneIcon>
                            </Button>
                        </div>
                    </div>
                    :
                    <div className='row'>
                        <div className='col-11 d-flex align-items-start'>
                            <div className="col-1 fs-6 mb-2">Instruction :</div>
                            <div className="col-11 fs-6 mb-2">{task.task_description}</div>
                        </div>
                        <div className='col-1 d-flex align-items-center'>
                            <IconButton type="button" onClick={() => {
                                setEditIntruction(true)
                            }}>
                                <EditNoteIcon fontSize='medium'></EditNoteIcon>
                            </IconButton>
                        </div>
                    </div>
                }
            </div>
            <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
            <div className="d-flex justify-content-between">
                    <label className="mb-1 fs-4">Data: </label>
                    <Chip label="Data" icon={<AddIcon />} onClick={() => {
                        const tmp = datas.slice()
                        tmp.push({
                            data: "",
                            status: "unlabeled",
                            labels: []
                        })
                        setData(tmp)
                    }}></Chip>
                </div>
                <DataList data={datas} editIndex={editIndex} setEditIndex={setEditIndex} register={register} />
            </div>
        </form>
    )
}

export async function taskEditLoader({params} : {params: Map<string, any>}){
    const {getToken} = useAuth();
    
    try{
        const response = await client.get(
            "/task/id/"+params["task_id"],
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                },
                params: {
                    expand: 1
                }
            }
        )
        
        return response.data
    }catch(err){
        if(err instanceof AxiosError){
            return console.log(err.response?.data.message)
        }
        return console.log(err)
    }
}