import TaskType from "../../components/admin/TaskType";
import { useSelector } from "react-redux";

export default function AdminTaskType() {
  const task_type = useSelector((state) => state.task_type.listTasktype);
  return (
    <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
      <div className="fw-bold fs-4 mb-2">Task Type</div>
      <TaskType TaskType={task_type}></TaskType>
    </div>
  );
}
