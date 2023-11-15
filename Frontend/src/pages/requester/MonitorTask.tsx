import TaskTable from '../../components/requester/TaskTable'
import task from '../../dummy_data/task.json'

export default function MonitorTask() {
    return (
        <div>
            <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
                <div className="fw-bold fs-4 mb-2">Task</div>
                <TaskTable task={task.filter((item) => item.requester == "vithun chandra")} />
            </div>
        </div>
    )
}