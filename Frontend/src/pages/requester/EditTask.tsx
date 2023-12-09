import { useFetcher, useLoaderData, useNavigate } from 'react-router-dom';
// import tasks from '../../dummy_data/task.json'
import DataList from '../../components/requester/DataList';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DoneIcon from '@mui/icons-material/Done';
import { IconButton, Button, Chip } from '@mui/material';
import { useDebugValue, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
// import Data from '../../interface/DataInterface';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import useAuth from '../../customHooks/authenticate';
import { client } from '../../api/client';
import { AxiosError } from 'axios';
import { IData } from '../../interface/IData';

export default function EditTask() {
    const[task, setTask] = useState(useLoaderData()[0]);
    const[dataShow, setDataShow] = useState<IData[]>(task.data);
    const[dataDelete, setDataDelete] = useState<string[]>([]);
    const[dataCreate, setDataCreate] = useState<string[]>([]);
    const[dataEdit, setDataEdit] = useState<{data_id:string, text:string}[]>(dataShow.map((data) => {return {data_id: data._id, text: data.text}}));
    const[editIndex, setEditIndex] = useState<{index:number, action:string}>({index: -1, action : ""});
    const[editName, setEditName] = useState<boolean>(false);
    const[editCredibility, setEditCredibility] = useState<boolean>(false);
    const[editIntruction, setEditIntruction] = useState<boolean>(false);
    const[loading, setLoading] = useState<boolean>(false);
    
    const {register, handleSubmit, reset} = useForm();
    const navigate = useNavigate()
    const fetcher = useFetcher()

    useEffect(() => {
        if(fetcher.state === "idle" && loading){
            setLoading(false);
            navigate("..",{
                relative: "path"
            })
        }
    }, [fetcher.state])

    return (
        <form onSubmit={handleSubmit(data => {
            console.log(data);
            // console.log(task);
            if(data.name){
                const temp = task;
                temp.task_name = data.name;
                setTask(temp);
            }
            if(data.credibility){
                const temp = task;
                temp.min_credibility = data.credibility;
                setTask(temp);
                setEditCredibility(false)
            }
            if(data.instruction){
                const temp = task;
                temp.task_description = data.instruction;
                setTask(temp);
            }
            if(data.posslab){
                const temp = task;
                const tmp = task.possible_label.slice()
                tmp.push(data.posslab)
                temp.possible_label = tmp
                setTask(temp);
            }
            if(data.data){
                if(editIndex.action == "save"){
                    const temp = dataShow.slice()
                    temp[editIndex.index].text = data.data[editIndex.index]
                    setDataShow(temp)
                    if(editIndex.index > dataEdit.length-1){
                        const tmp = dataCreate.slice()
                        tmp[editIndex.index - dataEdit.length] = data.data[editIndex.index]
                        setDataCreate(tmp)
                    }else{
                        const tmp = dataEdit.slice()
                        tmp[editIndex.index].text = data.data[editIndex.index]
                        setDataEdit(tmp)
                    }
                    setEditIndex({index: -1, action : ""})
                }else if(editIndex.action == "delete"){
                    const temp = dataShow.slice()
                    if(editIndex.index > dataEdit.length-1){
                        const tmp = dataCreate.slice()
                        tmp.splice(editIndex.index - dataEdit.length, 1);
                        setDataCreate(tmp)
                    }else{
                        const tmp = dataDelete.slice()
                        const tmp2 = dataEdit.slice()
                        tmp.push(temp[editIndex.index]._id)
                        setDataDelete(tmp)
                        tmp2.splice(editIndex.index, 1)
                        setDataEdit(tmp2)
                    }
                    temp.splice(editIndex.index, 1)
                    setDataShow(temp)
                    setEditIndex({index: -1, action : ""})
                }
            }
            if(!data.name && !data.credibility && !data.instruction && !data.data && !data.posslab){
                fetcher.submit({edit: JSON.stringify(dataEdit), create: JSON.stringify(dataCreate), delete: JSON.stringify(dataDelete), ...task, possible_label: JSON.stringify(task.possible_label)}, {
                    method: "post",
                    encType: "application/x-www-form-urlencoded",
                    action: "/requester/create_task/"+task._id
                })
                setLoading(true)
            }
            reset()
        })}>
            <div className='d-flex justify-content-between'>
            <Button color='info' variant='contained' startIcon={<ArrowBackIosIcon />} onClick={() => navigate("..", {relative: "path"})}>Back</Button>
                {(editName || editCredibility || editIntruction || editIndex.index != -1) ?
                    <Button startIcon={<SaveIcon />} variant='contained' color='success' size='large' type='submit' onClick={() => {
                        setEditName(false);
                        setEditCredibility(false);
                        setEditIntruction(false);
                    }}>
                        Finish All
                    </Button>
                    :
                    <Button startIcon={<SaveIcon />} variant='contained' color='success' size='large' type='submit'>
                        Save
                    </Button>
                }
            </div>
            <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
                {editName ?
                    <div className='d-flex align-items-center'>
                        <input type='text' className='w-50 form-control' defaultValue={task.task_name} {...register("name")} />
                        <IconButton type={"button"} className='ms-1' onClick={() => {
                            setEditName(false)
                        }}>
                            <DoneIcon fontSize='medium'></DoneIcon>
                        </IconButton>
                    </div>
                    :
                    <div className='d-flex align-items-center'>
                        <div className="fw-bold fs-4 mb-2">{task.task_name}</div>
                        <IconButton type={"submit"} className='ms-1' onClick={() => {
                            setEditName(true)
                        }}>
                            <EditNoteIcon fontSize='medium'></EditNoteIcon>
                        </IconButton>
                    </div>
                }
                <div className="fs-6 mb-2">Task Type : {task.task_type[0].name}</div>
                {task.task_type[0].name == "Classification" &&
                    <div className='d-flex'>
                        <div className='d-flex col-6'>
                            <div className="fs-6 mb-2">Possible Label :</div>
                            <div>
                                <ul>
                                    {
                                        task.possible_label.map((item, index) => {
                                            return <li key={index}>
                                                {item}
                                            </li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div>
                            <div className="fs-6 mb-2">Tambah Label</div>
                            <div className='d-flex'>
                                <input className='form-control' {...register("posslab")} />
                                <Button type='submit' variant='contained' className='ms-3'>Add</Button>
                            </div>
                        </div>
                    </div>
                }
                {editCredibility ?
                    <div className='d-flex align-items-center'>
                        <div className="fs-6 mb-2">Credibility : &nbsp;</div>
                        <input type='number' max={100} min={0} className='w-25 form-control' defaultValue={task.min_credibility} {...register("credibility")} />
                        <IconButton type={"submit"} className='ms-1' >
                            <DoneIcon fontSize='medium'></DoneIcon>
                        </IconButton>
                    </div>
                    :
                    <div className='d-flex align-items-center'>
                        <div className="fs-6 mb-2">Credibility : {task.min_credibility}</div>
                        <IconButton type={"button"} className='ms-1' onClick={() => {
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
                                <textarea defaultValue={task.task_description} {...register("instruction")} style={{height:"100px", resize:"none"}} className='w-100 form-control'></textarea>
                            </div>
                        </div>
                        <div className='col-1 d-flex align-items-center'>
                            <IconButton type={"button"} onClick={() => {
                                setEditIntruction(false)
                            }}>
                                <DoneIcon fontSize='medium'></DoneIcon>
                            </IconButton>
                        </div>
                    </div>
                    :
                    <div className='row'>
                        <div className='col-11 d-flex align-items-start'>
                            <div className="col-1 fs-6 mb-2">Instruction :</div>
                            <div className="col-11 fs-6 mb-2">{task.task_description}</div>
                        </div>
                        <div className='col-1 d-flex align-items-center'>
                            <IconButton type={"submit"} onClick={() => {
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
                        const tmp = dataCreate.slice()
                        const temp = dataShow.slice()
                        temp.push({
                            text: "",
                            labels: []
                        })
                        setDataShow(temp)
                        tmp.push("");
                        setDataCreate(tmp);
                    }}></Chip>
                </div>
                <DataList data={dataShow} editIndex={editIndex} setEditIndex={setEditIndex} register={register} />
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

export async function editTaskAction({request, params} : {request: any, params: any}){
    const formData = await request.formData();
    const {getToken} = useAuth();

    const name = formData.get("task_name")
    const desc = formData.get("task_description")
    const sd = formData.get("start_date")
    const ed = formData.get("end_date")
    const cred = formData.get("min_credibility")
    const pl = JSON.parse(formData.get("possible_label"))

    const editData = JSON.parse(formData.get("edit"))
    const createData = JSON.parse(formData.get("create"))
    const deleteData = JSON.parse(formData.get("delete"))

    try{
        let editing = null, deleting = null, creating = null, res = null

        const response = await client.post(
            "/task/edit",
            {task_id: params.task_id, task_name: name, task_description: desc, start_date: sd, end_date: ed, min_credibility: cred, possible_label: pl},
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                },
            }
        )
        res = response.data

        if(createData.length > 0){
            const response = await client.post(
                "/data/bulk_create",
                {task_id: params.task_id, data: createData},
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    },
                }
            )
            creating = response.data
        }
        if(editData.length > 0){
            const response = await client.post(
                "/data/bulk_edit",
                {new_data: editData},
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    },
                }
            )
            editing = response.data
        }
        if(deleteData.length > 0){
            const response = await client.delete(
                "/data/bulk_delete",
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    },
                    data: {
                        deleted_data_id: deleteData
                    }
                }
            )
            deleting = response.data
        }
        return {creating, editing, deleting, res}
    }catch(err){
        if(err instanceof AxiosError){
            return console.log(err.response?.data.message)
        }
        return console.log(err)
    }
}