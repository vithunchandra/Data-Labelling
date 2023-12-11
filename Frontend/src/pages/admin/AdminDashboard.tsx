import WavingHandIcon from "@mui/icons-material/WavingHand";
import Assignment from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import ProgressInfo from "../../components/admin/ProgressInfo";
import DashboardUser from "../../components/admin/DashboardUser";
import DashboardTaskType from "../../components/admin/DashboardTaskType";
import DashboardTask from "../../components/admin/DashboardTask";
import { Link, useLoaderData } from "react-router-dom";
import useAuth from "../../customHooks/authenticate";
import { client } from "../../api/client";
import { AxiosError } from "axios";

export default function AdminDashboard() {
  const data = useLoaderData();

  const user = data.users;
  const taskType = data.task_type;
  const task = data.task;

  const currentInfo = [
    {
      icon: <PeopleIcon sx={{ fontSize: "40px" }} color="info"></PeopleIcon>,
      titleText: "Total User",
      text: data.totalUser,
    },
    {
      icon: <Assignment sx={{ fontSize: "40px" }} color="info"></Assignment>,
      titleText: "Total Task Type",
      text: data.totalTasktype,
    },
    {
      icon: <Assignment sx={{ fontSize: "40px" }} color="info"></Assignment>,
      titleText: "Task",
      text: data.totalTask,
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
          <DashboardUser user={user}></DashboardUser>
        </Link>
        <Link
          className="col ms-4 bg-white rounded-2 shadow-sm p-3"
          to={"/admin/task_type"}
          style={{ textDecoration: "none" }}
        >
          <label className="fs-2 fw-bold text-black">Task Type</label>
          <DashboardTaskType taskType={taskType}></DashboardTaskType>
        </Link>
      </div>
      <div className="row justify-content-between align-items-stretch mt-4 g-0">
        <Link
          className="bg-white rounded-2 shadow-sm p-3"
          to={"/admin/task"}
          style={{ textDecoration: "none" }}
        >
          <label className="fs-2 fw-bold text-black">Task</label>
          <DashboardTask task={task}></DashboardTask>
        </Link>
      </div>
    </div>
  );
}

export async function adminDashboardLoader({ params }: any) {
  const { getToken } = useAuth();
  try {
    let loaderObject = {};
    let response = await client.get("admin/last_users", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    loaderObject = {
      ...loaderObject,
      users: response.data.users,
      totalUser: response.data.totalUser,
    };

    response = await client.get("admin/last_task_types", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    loaderObject = {
      ...loaderObject,
      task_type: response.data.task_type,
      totalTasktype: response.data.totalTaskType,
    };
    response = await client.get("admin/last_tasks", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    loaderObject = {
      ...loaderObject,
      task: response.data.task,
      totalTask: response.data.totalTask,
    };
    return loaderObject;
  } catch (err) {
    if (err instanceof AxiosError) {
      return console.log(err.response?.data.message);
    }
    return console.log(err);
  }
}
