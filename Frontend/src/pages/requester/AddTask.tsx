import task_type from "./../../dummy_data/task_type.json"
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Chip, IconButton, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import DoneAllIcon from '@mui/icons-material/DoneAll';

export default function AddTask() {
    const {register, handleSubmit, reset} = useForm();
    const[taskHeader, setTaskHeader] = useState<{name: string, type: string, instruction: string}>();
    const[data, setData] = useState<Array<string>>([""]);
    const[hapus, setHapus] = useState<number>(-1);
    const navigate = useNavigate()

    return (
        <form onSubmit={handleSubmit(data => {
            setTaskHeader({
                name: data.name,
                type: data.type,
                instruction: data.instruction
            })
            if(hapus != -1){
                const tmp = data.data.slice()
                tmp.splice(hapus, 1)
                setData(tmp)
                setHapus(-1)
            }else{
                console.log(data);
                navigate("..",{
                    relative: "path"
                })
            }
            reset()
        })}>
            <div className="d-flex justify-content-end">
                <Button color="success" variant="contained" size="large" type="submit" startIcon={<DoneAllIcon />}>
                    Done        
                </Button>
            </div>
            <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
                <div className="form-group mb-3">
                    <label className="mb-1 fs-4">Name: </label>
                    <input type="text" defaultValue={taskHeader?.name} className="form-control" required {...register("name")} placeholder="Name" />
                </div>
                <div className="form-group mb-3">
                    <label className="mb-1 fs-4">Type: </label>
                    <select className="form-control" {...register("type")} defaultValue={taskHeader?.type}>
                        {
                            task_type.map((item, index) => {
                                return <option key={index} value={item.name}>
                                    {item.name}
                                </option>
                            })
                        }
                    </select>
                </div>
                <div className="form-group mb-3">
                    <label className="mb-1 fs-4">Instruction: </label>
                    <textarea className="form-control" required defaultValue={taskHeader?.instruction} {...register("instruction")} placeholder="Instruction" rows={5} style={{resize:"none"}}></textarea>
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
                                    <input defaultValue={item} className="form-control" {...register("data."+index)} />
                                </div>
                                <div className="col-1">
                                    <IconButton type="submit" formNoValidate onClick={() => {
                                        setHapus(index)
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