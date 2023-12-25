import { useNavigate, useLoaderData } from "react-router-dom";
import DataArrayIcon from "@mui/icons-material/DataArray";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { client } from "../../api/client";
import { Wallet } from "@mui/icons-material";
import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import UsersTask from "../../components/admin/UsersTask";
import useAuth from "../../customHooks/authenticate";
import { AxiosError } from "axios";

export default function AdminUserDetail() {
  const data = useLoaderData();
  const user = data.user;
  const tempTask = data.userTasks;
  let usersTask = [];
  const navigate = useNavigate();

  for (let i = 0; i < data.totalTask; i++) {
    usersTask.push(tempTask[i]);
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
      data: `${data.totalTask} Task`,
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
            id="btn-back"
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
        <UsersTask data={{ usersTask, user }}></UsersTask>
      </>
    </>
  );
}

export async function getUserDetail({ params }: any) {
  const { getToken } = useAuth();

  try {
    let loaderObject = {};
    let response = await client.get("/user/id/" + params["user_id"], {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      params: {
        expand: 1,
      },
    });
    loaderObject = { ...loaderObject, user: { ...response.data } };
    response = await client.get("admin/user_detail/" + params["user_id"], {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      params: {
        expand: 1,
      },
    });
    loaderObject = {
      ...loaderObject,
      userTasks: { ...response.data },
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
