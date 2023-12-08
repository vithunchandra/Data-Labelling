import { Avatar, Button } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link, useSearchParams } from "react-router-dom";
import ITask from "../../interface/ITask";

interface ITaskTable{
  task: ITask[];
}

export default function TaskTable({ task }: ITaskTable) {
  let query = ''
  const [searchParams, setSearchParams] = useSearchParams()
  searchParams.forEach((value, key) => {
    if(value){
        query += '&' + key + '=' + value
    }
  })

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
              width: "15%",
            }}
          >
            Nama
          </th>
          <th
            className="align-middle"
            style={{
              width: "20%",
            }}
          >
            Requester
          </th>
          <th
            className="align-middle text-center"
            style={{
              width: "20%",
            }}
          >
            Type
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
            className="align-middle text-center"
            style={{
              width: "20%",
            }}
          >
            Closed Date
          </th>
          <th
            className="align-middle text-end"
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
              <td className="align-middle text-center">{item.task_type.name}</td>
              <td className="align-middle text-center">{item.data.length}</td>
              <td className="align-middle text-center">
                <span className="text-secondary">{new Date(item.end_date).toDateString()}</span>
              </td>
              <td className="align-middle text-end">
                <Link to={`${item._id}?${query}`}>
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
