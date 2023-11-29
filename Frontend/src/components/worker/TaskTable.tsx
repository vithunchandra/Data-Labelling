import { Avatar, Button } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link } from "react-router-dom";
import ITask from "../../interface/ITask";
import { useState } from "react";

export default function TaskTable({ task }: { task: ITask[] }) {
  const [skip, setSkip] = useState(0);
  return (
    <table className="table">
      <thead>
        <tr>
          <th
            className="align-middle"
            style={{
              width: "5%",
            }}
          >
            No
          </th>
          <th
            className="align-middle"
            style={{
              width: "25%",
            }}
          >
            Nama
          </th>
          <th
            className="align-middle"
            style={{
              width: "30%",
            }}
          >
            Requester
          </th>
          <th
            className="align-middle text-center"
            style={{
              width: "auto",
            }}
          >
            Total Data
          </th>
          <th
            className="align-middle"
            style={{
              width: "20%",
            }}
          >
            Closed Date
          </th>
          <th
            className="align-middle"
            style={{
              width: "10%",
            }}
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {task.map((item, index) => {
          const data = {
            tasks: task,
            index: index,
            skip
          }
          return (
            <tr key={index}>
              <td className="align-middle">{index + 1}</td>
              <td className="align-middle text-capitalize text-truncate">
                {item.task_name}
              </td>
              <td className="align-middle row g-0 align-items-center">
                <div className="col-auto">
                  <Avatar src={'https://picsum.photos/200'}></Avatar>
                </div>
                <div className="col ms-3 text-capitalize">
                  <div className="fw-bold">{item.requester.name}</div>
                </div>
              </td>
              <td className="align-middle text-center">{item.data.length}</td>
              <td className="align-middle">
                <span className="text-secondary">{new Date(item.end_date).toDateString()}</span>
              </td>
              <td className="align-middle">
                <Link to={item._id} state={data}>
                  <Button variant="contained" startIcon={<InfoOutlinedIcon />}>
                    Detail
                  </Button>
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
