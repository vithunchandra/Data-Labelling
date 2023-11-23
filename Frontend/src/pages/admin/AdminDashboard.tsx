import WavingHandIcon from "@mui/icons-material/WavingHand";
import Assignment from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import ProgressInfo from "../../components/admin/ProgressInfo";
import { useSelector } from "react-redux";
import DashboardUser from "../../components/admin/DashboardUser";
import DashboardTaskType from "../../components/admin/DashboardTaskType";
import DashboardTask from "../../components/admin/DashboardTask";
import task from "../../dummy_data/task.json";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const user = useSelector((state) => state.user.listUser);
  let lastUser = [];
  if (user.length > 5) {
    for (let i = user.length - 1; i > user.length - 6; i--) {
      lastUser.push(user[i]);
    }
  } else lastUser = user;
  const taskType = useSelector((state) => state.task_type.listTasktype);
  let lastTasktype = [];
  if (taskType.length > 5) {
    for (let i = taskType.length - 1; i > taskType.length - 6; i--) {
      lastTasktype.push(taskType[i]);
    }
  } else lastTasktype = taskType;

  let tasks = [];
  if (task.length > 5) {
    for (let i = task.length - 1; i > task.length - 6; i--) {
      tasks.push(task[i]);
    }
  } else tasks = task;

  const currentInfo = [
    {
      icon: <PeopleIcon sx={{ fontSize: "40px" }} color="info"></PeopleIcon>,
      titleText: "Total User",
      text: user.length,
    },
    {
      icon: <Assignment sx={{ fontSize: "40px" }} color="info"></Assignment>,
      titleText: "Total Task Type",
      text: taskType.length,
    },
    {
      icon: <Assignment sx={{ fontSize: "40px" }} color="info"></Assignment>,
      titleText: "Task",
      text: task.length,
    },
  ];
  return (
    <div className="mw-100 h-100 d-flex flex-column">
      <div className="display-6 fw-lighter">
        Welcome, Admin
        <WavingHandIcon
          sx={{ color: "#E8BEAC" }}
          fontSize="large"
          className="mx-2"
        />
      </div>

      <div className="my-3 fs-5">Current Information:</div>
      <div className="row align-items-center justify-content-between rounded-2 bg-white shadow-sm p-2 g-0">
        {currentInfo.map((item, index) => {
          return (
            <ProgressInfo
              icon={item.icon}
              titleText={item.titleText}
              text={item.text}
              key={index}
            ></ProgressInfo>
          );
        })}
      </div>

      <div className="row justify-content-between align-items-stretch mt-4 g-0">
        <Link
          className="col-7 bg-white rounded-2 shadow-sm p-3"
          to={"/admin/user"}
          style={{ textDecoration: "none" }}
        >
          <label className="fs-2 fw-bold text-black">User</label>
          <DashboardUser user={lastUser}></DashboardUser>
        </Link>
        <Link
          className="col ms-4 bg-white rounded-2 shadow-sm p-3"
          to={"/admin/task_type"}
          style={{ textDecoration: "none" }}
        >
          <label className="fs-2 fw-bold text-black">Task Type</label>
          <DashboardTaskType taskType={lastTasktype}></DashboardTaskType>
        </Link>
      </div>
      <div className="row justify-content-between align-items-stretch mt-4 g-0">
        <Link
          className="bg-white rounded-2 shadow-sm p-3"
          to={"/admin/task"}
          style={{ textDecoration: "none" }}
        >
          <label className="fs-2 fw-bold text-black">Task</label>
          <DashboardTask task={tasks}></DashboardTask>
        </Link>
      </div>
    </div>
  );
}
