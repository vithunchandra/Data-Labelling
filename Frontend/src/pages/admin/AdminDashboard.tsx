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
  console.log(data);

  const user = data.users;
  let lastUser = [];
  if (data.totalUser > 5) {
    for (let i = data.totalUser - 1; i > data.totalUser - 6; i--) {
      lastUser.push(user[i]);
    }
  } else lastUser = user;
  console.log(lastUser);

  const taskType = data.task_type;
  let lastTasktype = [];
  if (data.totalTasktype > 5) {
    for (let i = data.totalTasktype - 1; i > data.totalTasktype - 6; i--) {
      lastTasktype.push(taskType[i]);
    }
  } else lastTasktype = taskType;

  const task = data.task;
  let tasks = [];
  if (data.totalTask > 5) {
    for (let i = data.totalTask - 1; i > data.totalTask - 6; i--) {
      tasks.push(task[i]);
    }
  } else tasks = task;

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

export async function adminDashboardLoader({ params }: any) {
  const { getToken } = useAuth();
  try {
    let loaderObject = {};
    let response = await client.get("admin/all_users", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      params: {
        expand: 1,
      },
    });
    loaderObject = {
      ...loaderObject,
      users: response.data,
      totalUser: response.data.length,
    };
    response = await client.get("task_type", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    loaderObject = {
      ...loaderObject,
      task_type: response.data,
      totalTasktype: response.data.length,
    };
    response = await client.get("admin/all_tasks", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    loaderObject = {
      ...loaderObject,
      task: response.data,
      totalTask: response.data.length,
    };
    return loaderObject;
  } catch (err) {
    if (err instanceof AxiosError) {
      return console.log(err.response?.data.message);
    }
    return console.log(err);
  }
}
