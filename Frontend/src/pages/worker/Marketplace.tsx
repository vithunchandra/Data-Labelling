import TaskTable from "../../components/worker/TaskTable";
import task from '../../dummy_data/task.json';

export default function Marketplace(){
    return(
        <>
            <div className="w-100 bg-white p-5 rounded-4 shadow-sm">
                <TaskTable task={task}></TaskTable>
            </div>
        </>    
    )
}