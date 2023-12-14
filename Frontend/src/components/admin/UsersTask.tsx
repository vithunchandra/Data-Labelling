import { Avatar, Button } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link } from "react-router-dom";

export default function Users({ data }) {
  let task = data.usersTask;
  let usersTempPrice = [];
  let workerIncome = [];
  let totalprice = 0;
  let totalWorkerIncome = 0;
  let user = data.user;
  let closedTasksWorkerIncome = 0;

  task.sort((a, b) => (a.active === b.active ? 0 : a.active ? 1 : -1));

  task.map((item) => {
    let tempPrice = 0;
    let tempWorkerIncome = 0;

    item.data.map((data) => {
      data.labels.map((label) => {
        if (user._id == label.worker) {
          tempWorkerIncome += data.price;
        }
      });
      tempPrice += data.price * data.labels.length;
      totalprice += data.price * data.labels.length;
      totalWorkerIncome += data.price;
    });
    workerIncome.push(tempWorkerIncome);
    usersTempPrice.push(tempPrice);
    if (!item.active) {
      closedTasksWorkerIncome += tempWorkerIncome;
    }
  });

  return (
    <>
      <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
        <div className="d-flex align-items-end justify-content-end my-3">
          <div className="me-5 fw-bold">Total Price : Rp. {totalprice}</div>
          {user.role == "worker" && (
            <>
              <div className="me-5 fw-bold">
                Total Worker Income : Rp. {totalWorkerIncome}
              </div>
              <div className="me-5 fw-bold">
                Total Opened Task Income : Rp.{" "}
                {totalWorkerIncome - closedTasksWorkerIncome}
              </div>
              <div className="me-5 fw-bold">
                Total Closed Task Income : Rp. {closedTasksWorkerIncome}
              </div>
            </>
          )}
        </div>
        <div className="fw-bold fs-4">Task : </div>
        <table className="table">
          <thead>
            <tr>
              <th className="align-middle col-1">No</th>
              <th className="align-middle col-2">Nama</th>
              <th className="align-middle col-3">Requester</th>
              <th className="align-middle text-center col-1">Total Data</th>
              <th className="align-middle col-2">Closed Date</th>
              <th className="align-middle col-2">Total Price</th>
              {user.role == "worker" && (
                <th className="align-middle col-2">Worker's Income</th>
              )}
              <th className="align-middle col-2">Status</th>
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
                      {item.task_name}
                    </td>
                    <td className="align-middle row g-0 align-items-center">
                      <div className="col-auto">
                        <Avatar src={"https://picsum.photos/200"}></Avatar>
                      </div>
                      <div className="col ms-3 text-capitalize">
                        <div className="fw-bold">{item.requester[0].name}</div>
                      </div>
                    </td>
                    <td className="align-middle text-center">
                      {item.data.length}
                    </td>
                    <td className="align-middle">
                      <span className="text-secondary">
                        {new Date(item.end_date).toDateString()}
                      </span>
                    </td>
                    <td className="align-middle">
                      Rp. {usersTempPrice[index]}
                    </td>
                    {user.role == "worker" && (
                      <td>Rp. {workerIncome[index]}</td>
                    )}
                    {item.active && <td>Opened</td>}
                    {!item.active && <td>Closed</td>}
                    <td className="align-middle">
                      <Link to={`detail/${item._id}`}>
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
