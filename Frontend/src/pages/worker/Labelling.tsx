import { useLoaderData, useNavigate } from "react-router-dom"
import { Button, Chip, TextField } from "@mui/material"
import SelectInput from "../../components/SelectInput"
import { ChevronLeft, ChevronRight, Save } from "@mui/icons-material"
import { useEffect } from "react"
import { client } from "../../api/client"
import useAuth from "../../customHooks/authenticate"
import { IData } from "../../interface/IData"
import { AxiosError } from "axios"
import { useTask } from "./Task"

export default function Labelling(){
    const {task, dataTracker} = useTask()
    const data = useLoaderData() as IData
    const navigate = useNavigate()

    console.log('Test')
    useEffect(() => {
        if(dataTracker){
            navigate(`../viewdata/${dataTracker.getItem()._id}`)
        }
    }, [dataTracker.index])
    console.log(data.label.answer)
    
    return(
        <div className="p-3 rounded-2 shadow-sm bg-white overflow-y-auto">
            <div className="row g-0 aling-items-center justify-content-between">
                <div className="col-auto">
                    <Chip className="text-capitalize fw-bold" label={data.label ? 'Labelled': 'Unlabelled'} color={data.label ? 'primary' : 'default'} />
                </div>
            </div>
            <div className="my-3">
                {data.text}
            </div>
            <form className="mt-3">
                {
                    task.task_type.name === 'classification' && task.possible_label ? 
                        <SelectInput defaultValue={data.label.answer} items={task.possible_label.map((item) => {
                            return {value: item, text: item}
                        })} label="Classfication"/> : 
                        <TextField fullWidth id="outlined-multiline-flexible" label="Multiline" multiline maxRows={7}/>
                }
            </form>
            <div className="row justify-content-between mt-5">
                <div className="col-auto">
                    <Button className="me-3" variant="contained" startIcon={<ChevronLeft />} onClick={dataTracker.previous}>Previous</Button>
                    <Button variant="contained" endIcon={<ChevronRight />} onClick={dataTracker.next}>Next</Button>
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

export async function labellingLoader({params}: any){
    const data_id = params['data_id']
    const task_id = params['task_id']
    const {getToken} = useAuth()
    let data
    try{
        const response = await client.get(`/worker/task/${task_id}/data/${data_id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
        data = response.data.data
    }catch(err){
        if(err instanceof AxiosError){
            console.log(err.response?.data.message)
        }
    }

    return data as IData
}