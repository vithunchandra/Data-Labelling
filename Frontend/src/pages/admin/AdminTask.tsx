import Task from "../../components/admin/Task";
import task from "../../dummy_data/task.json";

export default function AdminTask() {
  return (
    <>
      <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
        <div className="fw-bold fs-4 mb-2">Task</div>
        <Task task={task}></Task>
      </div>
    </>
  );
}
