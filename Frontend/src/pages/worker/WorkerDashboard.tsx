import WavingHandIcon from '@mui/icons-material/WavingHand';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ProgressInfo from '../../components/worker/ProgressInfo';
import LastTask from '../../components/worker/LastTask';
import LastChat from '../../components/worker/LastChat';
import { client } from '../../api/client';
import useAuth from '../../customHooks/authenticate';
import { AxiosError } from 'axios';
import ITask from '../../interface/ITask';
import { IChat } from '../../interface/IChat';
import { IData } from '../../interface/IData';
import { useLoaderData } from 'react-router-dom';

interface ILoader{
    totalTasks: number;
    totalUnfinishedTasks: number;
    totalFinishedTasks: number;
    task: ITask;
    data: IData[];
    chats: IChat[];
}

export default function WorkerDashboard(){
    const {
        totalTasks, totalFinishedTasks,
        totalUnfinishedTasks, task,
        data, chats
    } = useLoaderData() as ILoader

    const progressInfo = [
        {
            icon: <InventoryIcon sx={{fontSize: '40px'}} color='info'></InventoryIcon>,
            titleText: 'Total Task',
            text: totalTasks
        },
        {
            icon: <AssignmentTurnedInIcon sx={{fontSize: '40px'}} color='success'></AssignmentTurnedInIcon>,
            titleText: 'Finished Task',
            text: totalFinishedTasks
        },
        {
            icon: <AssignmentIcon sx={{fontSize: '40px'}} color='action'></AssignmentIcon>,
            titleText: 'Ongoing Task',
            text: totalUnfinishedTasks
        },
    ]

    return(
        <>
            <div className="mw-100 h-100 d-flex flex-column">
                <div className="display-6 fw-lighter">
                    Welcome Back, Vithun Chandra
                    <WavingHandIcon sx={{color: '#E8BEAC'}} fontSize='large' className='mx-2'/>
                </div>

                <div className='my-3 fs-5'>
                    Current Task Progress:
                </div>
                <div className='row align-items-center justify-content-between rounded-2 bg-white shadow-sm p-2 g-0'>
                    {
                        progressInfo.map((item, index) => {
                            return <ProgressInfo icon={item.icon} titleText={item.titleText} text={item.text.toString()} key={index}></ProgressInfo>
                        })
                    }
                </div>
                
                <div className='row justify-content-between align-items-stretch mt-4 g-0'>
                    <div className='col-7 bg-white rounded-2 shadow-sm p-3'>
                        <LastTask task={task} data={data}></LastTask>
                    </div>
                    <div className='col ms-4 bg-white rounded-2 shadow-sm p-3'>
                        <LastChat chat={chats}></LastChat>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function workerDashboardLoader(){
    const {getToken} = useAuth()
    try{
        let loaderObject = {}
        let response = await client.get('worker/task/stats', {
            headers: {Authorization: `Bearer ${getToken()}`}
        })
        loaderObject = {...loaderObject, ...response.data}
        
        response = await client.get('worker/task/last', {
            headers: {Authorization: `Bearer ${getToken()}`}
        })
        loaderObject = {...loaderObject, ...response.data}

        response = await client.get('worker/lastchats', {
            headers: {Authorization: `Bearer ${getToken()}`}
        })
        loaderObject = {...loaderObject, ...response.data}
        console.log(loaderObject);
        return loaderObject
    }catch(err){
        if(err instanceof AxiosError){
            console.log(err.response?.data.message)
        }else{
            console.log(err)
        }
    }
}