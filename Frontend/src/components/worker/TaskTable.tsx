import { Avatar, Button } from "@mui/material";
import Task from "../../interface/TaskInterface";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link } from "react-router-dom";

export default function TaskTable({ task }: { task: Task[] }) {
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
          return (
            <tr key={index}>
              <td className="align-middle">{index + 1}</td>
              <td className="align-middle text-capitalize text-truncate">
                {item.name}
              </td>
              <td className="align-middle row g-0 align-items-center">
                <div className="col-auto">
                  <Avatar src={item.profile_image}></Avatar>
                </div>
                <div className="col ms-3 text-capitalize">
                  <div className="fw-bold">{item.requester}</div>
                </div>
              </td>
              <td className="align-middle text-center">{item.data.length}</td>
              <td className="align-middle">
                <span className="text-secondary">{item.finish_date}</span>
              </td>
              <td className="align-middle">
                <Link to={index.toString()}>
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
