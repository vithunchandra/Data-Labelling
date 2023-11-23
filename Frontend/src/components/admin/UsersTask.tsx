import { Avatar, Button, FormControl, MenuItem } from "@mui/material";
import Task from "../../interface/TaskInterface";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link } from "react-router-dom";

export default function Users({ task }: { task: Task[] }) {
  return (
    <>
      <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
        <div className="fw-bold fs-4">Data : </div>
        <table className="table">
          <thead>
            <tr>
              <th className="align-middle col-1">No</th>
              <th className="align-middle col-2">Nama</th>
              <th className="align-middle col-3">Requester</th>
              <th className="align-middle text-center col-1">Total Data</th>
              <th className="align-middle col-3">Closed Date</th>
              <th className="align-middle col-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {task.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No data found
                </td>
              </tr>
            ) : (
              task.map((item, index) => {
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
                    <td className="align-middle text-center">
                      {item.data.length}
                    </td>
                    <td className="align-middle">
                      <span className="text-secondary">{item.finish_date}</span>
                    </td>
                    <td className="align-middle">
                      <Link to={`detail/${index.toString()}`}>
                        <Button
                          variant="contained"
                          startIcon={<InfoOutlinedIcon />}
                        >
                          Detail
                        </Button>
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
