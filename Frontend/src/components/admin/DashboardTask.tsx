import Task from "../../interface/TaskInterface";
import { Avatar } from "@mui/material";

export default function DashboardTask({ task }: { task: Task[] }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th className="align-middle col-1">No</th>
          <th className="align-middle col-4">Nama</th>
          <th className="align-middle col-2">Requester</th>
          <th className="align-middle col-2">Type</th>
          <th className="align-middle text-center col-1">Total Data</th>
          <th className="align-middle col-2">Closed Date</th>
        </tr>
      </thead>
      <tbody>
        {task.map((item, index) => {
          return (
            <tr key={index}>
              <td className="align-middle">{index + 1}</td>
              <td className="align-middle text-capitalize text-truncate">
                {item.task_name}
              </td>
              <td className="align-middle row g-0 align-items-center">
                <div className="col-auto">
                  <Avatar src={"https://picsum.photos/200"}></Avatar>
                </div>
                <div className="col ms-3 text-capitalize">
                  <div className="fw-bold">{item.requester.name}</div>
                </div>
              </td>
              <td className="align-middle">{item.task_type.name}</td>
              <td className="align-middle text-center">{item.data.length}</td>
              <td className="align-middle">
                <span className="text-secondary">
                  {new Date(item.end_date).toDateString()}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
