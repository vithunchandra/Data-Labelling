import { useLoaderData, useNavigate } from "react-router-dom"
import tasks from '../../dummy_data/task.json'
import { Button, Chip, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import SelectInput from "../../components/SelectInput"
import { ChevronLeft, ChevronRight, Save } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { set } from "react-hook-form"

export default function Labelling(){
    let params = useLoaderData() as {
        task_id: string,
        data_id: string
    }
    const task_id = parseInt(params.task_id)
    const data_id = parseInt(params.data_id)
    const navigate = useNavigate()

    const task = tasks[task_id]
    const data = task.data[data_id]
    const [label, setLabel] = useState(data.label)

    function previous(){
        if(data_id > 0){
            navigate(`../viewdata/${data_id - 1}`, {
                relative: 'route'
            })
        }
    }

    function next(){
        if(task.data.length - 1 > data_id){
            navigate(`../viewdata/${data_id + 1}`, {
                relative: 'route'
            })
        }
    }

    useEffect(() => {
        setLabel(data.label)
    }, [params])
    
    return(
        <div className="p-3 rounded-2 shadow-sm bg-white overflow-y-auto">
            <div className="row g-0 aling-items-center justify-content-between">
                <div className="col-auto fs-5 fw-bold">Data#{data_id + 1}</div>
                <div className="col-auto">
                    <Chip className="text-capitalize fw-bold" label={data.status} color={data.status === 'labelled' ? 'primary' : 'default'} />
                </div>
            </div>
            <div className="my-3">
                {data.data}
            </div>
            <form className="mt-3">
                {
                    task.type === 'classification' && task.possible_classification ? 
                        <SelectInput defaultValue={data.label} items={task.possible_classification.map((item) => {
                            return {value: item, text: item}
                        })} label="Classfication"/> : 
                        <TextField fullWidth id="outlined-multiline-flexible" label="Multiline" multiline maxRows={7}/>
                }
            </form>
            <div className="row justify-content-between mt-5">
                <div className="col-auto">
                    <Button className="me-3" variant="contained" startIcon={<ChevronLeft />} onClick={previous}>Previous</Button>
                    <Button variant="contained" endIcon={<ChevronRight />} onClick={next}>Next</Button>
                </div>
                <div className="col-auto">
                    <Button variant="contained" color="success" endIcon={<Save />}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
}

export function labelllingLoader({params}: {params: Map<string, any>}){
    return {
        task_id: params['task_id'],
        data_id: params['data_id']
    }
}