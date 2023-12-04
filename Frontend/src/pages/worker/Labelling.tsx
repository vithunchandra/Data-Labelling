import { useLoaderData, useNavigate } from "react-router-dom"
import { Button, Chip } from "@mui/material"
import { ChevronLeft, ChevronRight, Save } from "@mui/icons-material"
import { client } from "../../api/client"
import useAuth from "../../customHooks/authenticate"
import { IData } from "../../interface/IData"
import { AxiosError } from "axios"
import { useTask } from "./Task"
import FormTextField from "../../components/form/FormTextField"
import FormSelect from "../../components/form/FormSelect"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useEffect } from "react"

interface ILoader{
    data: IData;
    prev: IData;
    next: IData;
}

interface IFormInput{
    input: string;
}

export default function Labelling(){
    const {data, prev, next} = useLoaderData() as ILoader
    const { task } = useTask()
    const navigate = useNavigate()
    const formProps = useForm<IFormInput>()
    const {getToken} =useAuth()

    const possible_label = task.possible_label.map( item => {
        return {label: item, value: item.toLowerCase()}
    })

    const labelling: SubmitHandler<IFormInput> = async (form: IFormInput) => {
        console.log(form)
        try{
            const response = await client.post(`/worker/task/${task._id}/data/${data._id}/${data.label?._id}`,
                {...form, label_id: data.label?._id}, 
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                }
            )
            navigate('')   
        }catch(err){
            if(err instanceof AxiosError){
                console.log(err.response?.data.message)
            }
            console.log(err)
        }
    }

    useEffect(() => {
        formProps.reset({
            input: data.label? data.label.answer : '',
        })
    }, [data])

    return(
        <div className="p-3 rounded-2 shadow-sm bg-white overflow-y-auto">
            <div className="row g-0 aling-items-center justify-content-between">
                <div className="col-auto">
                    <Chip className="text-capitalize fw-bold" label={data.label?.answer ? 'Labelled': 'Unlabelled'} color={data.label?.answer ? 'primary' : 'default'} />
                </div>
            </div>
            <div className="my-3">
                {data.text}
            </div>
            <FormProvider {...formProps}>
                <form className="mt-3" onSubmit={formProps.handleSubmit(labelling)}>
                    {
                        task.task_type.name === 'Classification' && task.possible_label ? 
                            <FormSelect className="" name="input" label="Label"  defaultValue={data.label ? data.label.answer : ''} options={possible_label}/> : 
                            <FormTextField className="" name="input" label="Label" type="text" variant="outlined" defaultValue={data.label ? data.label.answer : ''}/>
                    }
                    <div className="row justify-content-between mt-5">
                        <div className="col-auto">
                            <Button type="button" className={`me-3 ${!prev ? 'invisible' : ''}`} variant="contained" 
                                startIcon={<ChevronLeft />} 
                                onClick={() => navigate(`../viewdata/${prev?._id}`, {state: prev?._id})}
                            >Previous</Button>
                            <Button type="button" className={`${!next ? 'invisible' : ''}`} variant="contained" 
                                endIcon={<ChevronRight />} 
                                onClick={() => navigate(`../viewdata/${next?._id}`, {state: next?._id})}
                            >Next</Button>
                        </div>
                        <div className="col-auto">
                            <Button type="submit" variant="contained" color="success" endIcon={<Save />}>
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
            </FormProvider>
            
        </div>
    )
}

export async function labellingLoader({params}: any){
    const data_id = params['data_id']
    const task_id = params['task_id']
    const {getToken} = useAuth()
    try{
        const response = await client.get(`/worker/task/${task_id}/data/${data_id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
        console.log(response.data)
        return response.data as ILoader
    }catch(err){
        if(err instanceof AxiosError){
            return console.log(err.response?.data.message)
        }
        return console.log(err)
    }
}