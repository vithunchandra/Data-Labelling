import { useLoaderData } from 'react-router-dom';
import TaskTable from '../../components/requester/TaskTable'
// import task from '../../dummy_data/task.json'

export default function MonitorTask() {
    const task = useLoaderData();

    return (
        <div>
            <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
                <div className="fw-bold fs-4 mb-2">Task</div>
                <TaskTable task={task} />
            </div>
        </div>
    )
}

export async function MonitorTaskAction ({request, params} : {request: any, params: any}) {    
    const formData = await request.formData();
    const _id = formData.get("_id");
    
    alert(_id);
    
    return _id
}