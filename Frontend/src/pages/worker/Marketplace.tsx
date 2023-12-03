import { AxiosError } from "axios";
import { client } from "../../api/client";
import TaskTable from "../../components/worker/TaskTable";
import ITask from "../../interface/ITask";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../customHooks/authenticate";
import PageNavigationButton from "../../components/worker/pageNavigation";

interface ILoader{
    page: number;
    totalPages: number;
    tasks: ITask[];
}

export default function Marketplace(){
    const {tasks, page, totalPages} = useLoaderData() as ILoader

    return(
        <>
            <div className="w-100 bg-white px-5 py-4 rounded-2 shadow">
                <TaskTable task={tasks}></TaskTable>
                <div className="text-end mt-5">
                    <PageNavigationButton page={page} totalPages={totalPages} baseUrl="../marketplace"/>
                </div>
            </div>
        </>    
    )
}

export async function marketplaceLoader({request} : any){
    const url = new URL(request.url)
    const page = url.searchParams.get('page') !== null ? parseInt(url.searchParams.get('page')!) : 1
    const {getToken} = useAuth()
    try{
        const response = await client.get('/worker/marketplace', {
            headers: {
                Authorization: "Bearer " + getToken()
            },
            params: {
                page
            }
        });
        const {tasks, totalPages} = response.data;
        return {
            page,
            totalPages,
            tasks,
        } as ILoader;
    }catch(err: unknown){
        if(err instanceof AxiosError){
            return console.log(err.response?.data.message)
        }
        return console.log(err)
    }
    
}