// import task_type from "./../../dummy_data/task_type.json"
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Chip, IconButton, Button } from '@mui/material';
import { useFetcher, useLoaderData, useNavigate } from "react-router-dom";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { client } from "../../api/client";
import useAuth from "../../customHooks/authenticate";
import { AxiosError } from "axios";
import BackspaceIcon from '@mui/icons-material/Backspace';

export default function AddTask() {
    const task_type = useLoaderData();
    const {register, handleSubmit, reset} = useForm();
    const[taskHeader, setTaskHeader] = useState<{name: string, type: string, instruction: string, credibility: number}>({name: "", type: task_type[0]._id, instruction: "", credibility: 50});
    const[data, setData] = useState<Array<string>>([""]);
    const[hapus, setHapus] = useState<{idx: number, state: string}>({idx: -1, state: ""});
    const navigate = useNavigate()
    const fetcher = useFetcher()
    const[loading, setLoading] = useState<boolean>(false);
    const[typeSelected, setTypeSelected] = useState<string>(task_type[0].name);
    const[possLab, setPossLab] = useState<Array<string>>(["",""])
    
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
            console.log({data, typeSelected});
            setTaskHeader({
                name: data.name,
                type: data.type,
                instruction: data.instruction,
                credibility: data.credibility
            })

            if(hapus.idx != -1){
                if(hapus.state == "data"){
                    const tmp = data.data.slice()
                    tmp.splice(hapus.idx, 1)
                    setData(tmp)
                    setHapus({idx: -1, state: ""})
                }else if(hapus.state == "posslab"){
                    const tmp = data.posslab.slice()
                    tmp.splice(hapus.idx, 1)
                    setPossLab(tmp)
                    setHapus({idx: -1, state: ""})
                }
            }else{
                if(data.data && data.data.length > 0 && data.posslab && data.posslab.length >= 2){
                    fetcher.submit({...data, data: JSON.stringify(data.data), possLab: JSON.stringify(data.posslab)}, {
                        method: "post",
                        encType: "application/x-www-form-urlencoded",
                        action: "/requester/create_task/add"
                    })
                    setLoading(true);
                }
            }
            reset()
        })}>
            <div className="d-flex justify-content-between">
                <Button color='info' variant='contained' startIcon={<ArrowBackIosIcon />} onClick={() => navigate("..", {relative: "path"})}>Back</Button>
                <Button color="success" variant="contained" size="large" type="submit" startIcon={<DoneAllIcon />}>
                    Done        
                </Button>
            </div>
            <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
                <div className="form-group mb-3">
                    <label className="mb-1 fs-4">Name: </label>
                    <input type="text" defaultValue={taskHeader.name} className="form-control" required {...register("name")} placeholder="Name" />
                </div>
                <div className="form-group mb-3 d-flex">
                    <div className="w-75 me-5">
                        <label className="mb-1 fs-4">Type: </label>
                        <select id='type' className="form-control" defaultValue={taskHeader.type} {...register("type")} onChange={() => {const e = document.getElementById("type"); setTypeSelected(e.options[e.selectedIndex].text)}}>
                            {
                                task_type.map((item, index) => {
                                    return <option key={index} value={item._id}>
                                        {item.name}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                    <div className="d-flex flex-column w-25">
                        <label className="mb-1 fs-4">Credibility: </label>
                        <input type="number" className="form-control" defaultValue={taskHeader.credibility} min={0} max={100} required {...register("credibility")} />
                    </div>
                </div>
                {typeSelected == "Classification" ? 
                    <div className="form-group mb-3">
                        <div className="d-flex justify-content-between">
                            <label className="mb-1 fs-4">Possible Label: </label>
                            <Chip label="Label" icon={<AddIcon />} onClick={() => {
                                const tmp = possLab.slice()
                                tmp.push("")
                                setPossLab(tmp)
                            }}></Chip>
                        </div>
                        {
                            possLab.map((item, index) => {
                                return <div className="form-group row d-flex align-items-center mb-1" key={index}>
                                    <div className="col-11">
                                        <input defaultValue={item} required className="form-control" {...register("posslab."+index)} />
                                    </div>
                                    <div className="col-1">
                                        <IconButton type="submit" formNoValidate onClick={() => {
                                            setHapus({idx: index, state: "posslab"})
                                        }}>
                                            <BackspaceIcon></BackspaceIcon>
                                        </IconButton>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    :
                    <></>
                }
                <div className="form-group mb-3">
                    <label className="mb-1 fs-4">Instruction: </label>
                    <textarea className="form-control" required defaultValue={taskHeader.instruction} {...register("instruction")} placeholder="Instruction" rows={5} style={{resize:"none"}}></textarea>
                </div>
            </div>
            <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
                <div className="d-flex justify-content-between">
                    <label className="mb-1 fs-4">Data: </label>
                    <Chip label="Data" icon={<AddIcon />} onClick={() => {
                        const tmp = data.slice()
                        tmp.push("")
                        setData(tmp)
                    }}></Chip>
                </div>
                {
                    data.map((item, index) => {
                        return (
                            <div className="form-group row d-flex align-items-center" key={index}>
                                <span className="col-1 text-center fs-5">{index+1} :</span>
                                <div className="col-10">
                                    <input defaultValue={item} required className="form-control" {...register("data."+index)} />
                                </div>
                                <div className="col-1">
                                    <IconButton type="submit" formNoValidate onClick={() => {
                                        setHapus({idx: index, state: "data"})
                                    }}>
                                        <DeleteIcon></DeleteIcon>
                                    </IconButton>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </form>
    )
}

export async function AddTaskAction ({request, params} : {request: any, params: any}) {
    const formData = await request.formData();
    const {getToken} = useAuth();

    const task_name = formData.get("name")
    const task_type = formData.get("type")
    const task_data = JSON.parse(formData.get("data"))
    const task_credibility = formData.get("credibility")
    const task_instruction = formData.get("instruction")
    const task_end_date = new Date(Date.now()+604800000).toISOString()
    const task_possible_label = JSON.parse(formData.get("possLab"))
    

    try{
        const task = await client.post(
            "/task/create",
            {task_name, task_type_id: task_type, min_credibility: task_credibility, task_description: task_instruction, end_date: task_end_date, possible_label: task_possible_label},
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                },
            }
        )
        const data = await client.post(
            "/data/bulk_create",
            {task_id: task.data.data._id, data: task_data},
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                },
            }
        )
        return {task: task.data, data: data.data}
    }catch(err){
        if(err instanceof AxiosError){
            return console.log(err.response?.data.message)
        }
        return console.log(err)
    }
}

export async function getAllTaskType ({params}) {
    try{
        const response = await client.get(
            "/task_type"
        )
        return response.data
    }catch(err){
        if(err instanceof AxiosError){
            return console.log(err.response?.data.message)
        }
        return console.log(err)
    }
}