import DataTable from "../../components/worker/DataTable"
import Filters from "../../components/worker/Filters"
import { TaskType } from "../../enum/TaskType"
import task from '../../dummy_data/task.json'
import TaskTable from "../../components/worker/TaskTable"

export default function WorkerTask(){
    const taskType = [
        TaskType.Classification, TaskType.Summarization, TaskType.Translation
    ]

    return(
        <div className="w-100">
            <div className="row align-items-center g-0 justify-content-between bg-white rounded-2 p-2 shadow-sm fs-3">
                <div className="col-auto">
                    Your Progress
                </div>
                <div className="col-auto d-flex align-items-center">
                    <span className="text-primary fw-bold me-2">12/50</span>
                    <span>Task</span>
                </div>
            </div>

            <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
                <Filters taskType={taskType}></Filters>
            </div>

            <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
                <TaskTable task={task} />
            </div>  
        </div>
    )
}