import ITask from "../../interface/ITask";
import DataTable from "./DataTable";
import { IData } from "../../interface/IData";

export default function LastTask({task, data}: {task: ITask, data: IData[]}){
    console.log(task);
    
    return(
        <>
            <div className="fs-5 fw-light">Last Task</div>
            {task && <>
            <div className="row align-items-center my-1">
                <div className="col-6 fs-4 fw-bold text-capitalize">{task.task_name}</div>
                <div className="col-6 text-secondary text-end">{new Date(task.end_date).toDateString()}</div>
            </div>
            <DataTable data={data} baseUrl={`./task/${task._id}/viewdata`}/>
            </>
            }
        </>
    )
}