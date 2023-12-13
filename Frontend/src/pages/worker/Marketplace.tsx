import { AxiosError } from "axios";
import { client } from "../../api/client";
import TaskTable from "../../components/worker/TaskTable";
import ITask from "../../interface/ITask";
import { useLoaderData, useSearchParams } from "react-router-dom";
import useAuth from "../../customHooks/authenticate";
import PageNavigationButton from "../../components/worker/pageNavigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import FormSelect from "../../components/form/FormSelect";
import FormDate from "../../components/form/FormDate";
import FormTextField from "../../components/form/FormTextField";
import ITaskType from "../../interface/ITaskType";

interface ILoader{
    page: number;
    totalPages: number;
    tasks: ITask[];
    types: ITaskType[];
}

interface IFilters{
    type: string | undefined;
    startDate: any | undefined;
    name: string | undefined;
}

export default function Marketplace(){
    const {tasks, page, totalPages, types} = useLoaderData() as ILoader
    console.log(totalPages)
    const [searchParams, setSearchParams] = useSearchParams()
    const typeOptions = [{label: 'None', value: ''}, ...types?.map((item) => {
        return {
            label: item.name,
            value: item.name,
        }
    })]
    const formProps = useForm<IFilters>()


    const filterHandler: SubmitHandler<IFilters> = (data: IFilters) => {
        searchParams.delete('page')
        searchParams.delete('name')
        searchParams.delete('startDate')
        searchParams.delete('type')
        const {name, startDate, type} = data;

        name && searchParams.set('name', name)
        startDate && searchParams.set('startDate', startDate)
        type && searchParams.set('type', type)

        setSearchParams(searchParams)
    }

    return(
        <>
            <div className="container-fluid p-3 bg-white rounded-2 shadow-sm">
                <FormProvider {...formProps}>
                    <form onSubmit={formProps.handleSubmit(filterHandler)} className="row align-items-center g-0">
                        <div className="row aling-items-center g-0 col-12 mb-3">
                            <div className="fs-5 col">Filters</div>
                            <div className="col-auto">
                                <Button type="submit" variant="contained">Apply Filters</Button>
                            </div>
                        </div>
                        <div className="col-4">
                            <FormSelect name="type" defaultValue={searchParams.get('type') !== null ? searchParams.get('type')! : ''} label="Task Type" options={typeOptions} className="" size="small"/>
                        </div>
                        <div className="col-auto flex-fill mx-5">
                            <FormDate name="startDate" label="Start Date" className="" defaultValue={searchParams.get('startDate') !== null ? new Date(searchParams.get('startDate')!).toString() : new Date().toISOString()}/>
                        </div>
                        <div className="col-auto flex-fill">
                            <FormTextField name="name" defaultValue={searchParams.get('name') !== null ? searchParams.get('name')! : ''} label="Task Name" type="text" variant="outlined" className="" size="small"/>
                        </div>
                    </form>
                </FormProvider>
            </div>
            <div className="w-100 bg-white px-5 py-4 mt-4 rounded-2 shadow">
                <TaskTable task={tasks}></TaskTable>
                <div className="text-end mt-4">
                    <PageNavigationButton page={page} totalPages={totalPages} baseUrl="../marketplace"/>
                </div>
            </div>
            
        </>    
    )
}

export async function marketplaceLoader({request} : any){
    const url = new URL(request.url)
    const page = url.searchParams.get('page') !== null ? parseInt(url.searchParams.get('page')!) : 1

    const typeParam = url.searchParams.get('type')
    const startDateParam = url.searchParams.get('startDate')
    const nameParam = url.searchParams.get('name')

    const type = typeParam !== null ? typeParam : ''
    const startDate = startDateParam !== null ? startDateParam : undefined
    const name = nameParam !== null ? nameParam : ''

    const {getToken} = useAuth()
    try{
        let response = await client.get('/worker/marketplace', {
            headers: {
                Authorization: "Bearer " + getToken()
            },
            params: {
                page,
                type,
                startDate,
                name
            }
        });
        const {tasks, totalPages} = response.data;
        response = await client.get('/task_type')
        return {
            page,
            totalPages,
            tasks,
            types: response.data
        } as ILoader;
    }catch(err: unknown){
        if(err instanceof AxiosError){
            console.log(err.response?.data.message)
        }else{
            console.log(err)
        }
        return null
    }
    
}