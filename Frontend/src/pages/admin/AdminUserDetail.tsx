import { useParams, useNavigate } from "react-router-dom";
import users from "../../dummy_data/user.json";
import tasks from "../../dummy_data/task.json";
import DataArrayIcon from "@mui/icons-material/DataArray";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { Wallet } from "@mui/icons-material";
import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import UsersTask from "../../components/admin/UsersTask";

export default function AdminUserDetail() {
  const { user_id } = useParams();
  const user = users.find((user) => user._id == user_id);
  const navigate = useNavigate();

  let usersTask;
  if (user.role == "Requester") {
    usersTask = tasks.filter(
      (task) => task.requester.toLowerCase() == user.name.toLowerCase()
    );
  } else if (user.role == "Worker") {
    usersTask = tasks.filter((task) => task.workers.includes(user.name));
  }

  const taskData = [
    {
      icon: (
        <DataArrayIcon
          sx={{ fontSize: "40px" }}
          color="warning"
          className="me-2"
        ></DataArrayIcon>
      ),
      data: `${usersTask.length} Task`,
    },
    {
      icon: (
        <AssignmentIndIcon
          sx={{ fontSize: "40px" }}
          color="primary"
          className="me-2"
        ></AssignmentIndIcon>
      ),
      data: `${user?.role} `,
    },
    {
      icon: (
        <AddReactionOutlinedIcon
          sx={{ fontSize: "40px" }}
          color="action"
          className="me-2"
        ></AddReactionOutlinedIcon>
      ),
      data: `${user?.credibility} Credibility Score`,
    },
    {
      icon: (
        <Wallet
          sx={{ fontSize: "40px" }}
          color="primary"
          className="me-2"
        ></Wallet>
      ),
      data: `Rp. ${user?.wallet}`,
    },
  ];
  return (
    <>
      <>
        <div className="d-flex justify-content-between">
          <Button
            color="info"
            variant="contained"
            startIcon={<ArrowBackIosIcon />}
            onClick={() => navigate("..", { relative: "path" })}
          >
            Back
          </Button>
        </div>
        <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm text-capitalize">
          <div className="d-flex align-items-center justify-content-between">
            <div className="display-6">{user.name}</div>
          </div>
          <div className="w-75 row flex-row justify-content-between mb-4 g-0 ">
            <div className="fw-bold fs-4 pt-3">User Information</div>
            {taskData.map((item, index) => {
              return (
                <div
                  className="col-auto d-flex align-items-center pt-3"
                  key={index}
                >
                  {item.icon}
                  <span className="fs-5">{item.data}</span>
                </div>
              );
            })}
          </div>
        </div>
        <UsersTask task={usersTask}></UsersTask>
      </>
    </>
  );
}
