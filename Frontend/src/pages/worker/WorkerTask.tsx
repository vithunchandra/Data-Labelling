import TaskTable from "../../components/worker/TaskTable"
import { client } from "../../api/client"
import useAuth from "../../customHooks/authenticate"
import ITask from "../../interface/ITask"
import { AxiosError } from "axios"
import { useLoaderData, useSearchParams } from "react-router-dom"
import ITaskType from "../../interface/ITaskType"
import PageNavigationButton from "../../components/worker/pageNavigation"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import FormSelect from "../../components/form/FormSelect"
import FormDate from "../../components/form/FormDate"
import FormTextField from "../../components/form/FormTextField"
import { Button } from "@mui/material"

interface ITaskStats{
    totalTasks: number;
    totalFinishedTasks: number;
    totalUnfinishedTasks: number;
}

interface ILoader{
    tasks: ITask[];
    page: number;
    totalPages: number;
    types: ITaskType[];
    stats: ITaskStats;
}

interface IFilters{
    type: string | undefined;
    startDate: any | undefined;
    name: string | undefined;
}

export default function WorkerTask(){
    const { tasks, page, totalPages, types, stats } = useLoaderData() as ILoader
    const formProps = useForm<IFilters>()
    const typeOptions = [{label: 'None', value: ''}, ...types?.map((item) => {
        return {
            label: item.name,
            value: item.name,
        }
    })]
    const [searchParams, setSearchParams] = useSearchParams()

    const filterHandler: SubmitHandler<IFilters> = (data: IFilters) => {
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
        <div className="w-100">
            <div className="row align-items-center g-0 justify-content-between bg-white rounded-2 p-2 shadow-sm fs-3">
                <div className="col-auto">
                    Your Progress
                </div>
                <div className="col-auto d-flex align-items-center">
                    <span className="text-primary fw-bold me-2">{`${stats.totalFinishedTasks}/${stats.totalTasks}`}</span>
                </div>
            </div>
            <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
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
            <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow">
                <TaskTable task={tasks}/>
                <div className="text-end">
                    <PageNavigationButton page={page} totalPages={totalPages} baseUrl="../task"/>
                </div>
            </div>
        </div>
    )
}

export const workerTaskLoader = async ({request}: any) => {
    const {getToken} = useAuth()
    const url = new URL(request.url)

    const pageParam = url.searchParams.get('page')
    const typeParam = url.searchParams.get('type')
    const startDateParam = url.searchParams.get('startDate')
    const nameParam = url.searchParams.get('name')

    const page = pageParam !== null ? parseInt(pageParam!) : 1
    const type = typeParam !== null ? typeParam : ''
    const startDate = startDateParam !== null ? startDateParam : undefined
    const name = nameParam !== null ? nameParam : ''

    try{
        let loaderObject = {}
        let response = await client.get(`/worker/task`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            },
            params: {
                page,
                type,
                startDate,
                name
            }
        })
        loaderObject = {...response.data}
        
        response = await client.get('/task_type')
        loaderObject['types'] = response.data
        loaderObject['page'] = page

        response = await client.get('worker/task/stats', {
            headers: {Authorization: `Bearer ${getToken()}`}
        })
        loaderObject['stats'] = {...response.data}
        return loaderObject as ILoader
    }catch(err){
        if(err instanceof AxiosError){
           console.log(err.response?.data.message)
        }else{
            console.log(err)
        }
        return null
    }
}