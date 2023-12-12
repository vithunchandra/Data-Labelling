import {
  CircularProgress,
  CircularProgressProps,
  Button,
  Chip,
  Box,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import DataArrayIcon from "@mui/icons-material/DataArray";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import PaymentIcon from "@mui/icons-material/Payment";
import ListLabel from "../../components/admin/ListLabel";
import useAuth from "../../customHooks/authenticate";
import { client } from "../../api/client";
import { AxiosError } from "axios";

export default function AdminUserTaskDetail() {
  const task = useLoaderData()[0];
  const navigate = useNavigate();
  let worker = "";
  task.worker.map((item, index) => {
    if (task.worker.length - 1 != index) worker += item.user.name + ", ";
    else worker += item.user.name;
  });

  let totalTaskPrice = 0;
  task.data.map((item, index) => {
    totalTaskPrice += item.labels.length * item.price;
  });

  function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number }
  ) {
    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
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
      data: `${task.data.length} Data`,
    },
    {
      icon: (
        <AttachMoneyIcon
          sx={{ fontSize: "40px" }}
          color="success"
          className="me-2"
        ></AttachMoneyIcon>
      ),
      data: `${task.task_type[0].price}/char`,
    },
    {
      icon: (
        <AddReactionOutlinedIcon
          sx={{ fontSize: "40px" }}
          color="action"
          className="me-2"
        ></AddReactionOutlinedIcon>
      ),
      data: `${task.min_credibility} Credibility Score`,
    },
    {
      icon: (
        <PersonIcon
          sx={{ fontSize: "40px" }}
          color="primary"
          className="me-2"
        ></PersonIcon>
      ),
      data: `${task.requester[0].name}`,
    },
    {
      icon: (
        <PaymentIcon
          sx={{ fontSize: "40px" }}
          color="success"
          className="me-2"
        ></PaymentIcon>
      ),
      data: `Rp. ${totalTaskPrice}`,
    },
    {
      icon: (
        <PeopleIcon
          sx={{ fontSize: "40px" }}
          color="primary"
          className="me-2"
        ></PeopleIcon>
      ),
      data: `${worker}`,
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-between">
        <Button
          color="info"
          variant="contained"
          startIcon={<ArrowBackIosIcon />}
          onClick={() => navigate("../..", { relative: "path" })}
        >
          Back
        </Button>
      </div>
      <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm text-capitalize">
        <div className="d-flex align-items-center justify-content-between">
          <div className="display-6 fw-bold">{task.task_name}</div>
          <div className="col-auto d-flex align-items-center">
            <div className="fs-2 fw-light text-secondary">
              {task.task_type[0].name}
            </div>
          </div>
          {/* {task.status ? (
              <div className="fs-2 fw-light text-success">Finished</div>
            ) : (
              <div className="fs-2 fw-light text-danger">Unfinished</div>
            )} */}
        </div>
        <div className="fs-5 mt-1">
          {new Date(task.start_date).toDateString()} -{" "}
          {new Date(task.end_date).toDateString()}
        </div>
        <div className="w-75 row flex-row justify-content-between mb-4 g-0">
          <div className="fw-bold fs-4 mt-4">Task Information</div>
          {taskData.map((item, index) => {
            return (
              <div
                className="col-auto d-flex align-items-center pb-3"
                key={index}
              >
                {item.icon}
                <span className="fs-5">{item.data}</span>
              </div>
            );
          })}
        </div>
        <div className="fs-6 mb-2"></div>
        <div className="row">
          <div className="fs-5">
            <span className="fw-bold">Instruction:</span>
            <br />
            <p className="fs-6 ps-4">{task.task_description}</p>
          </div>
        </div>
      </div>
      {task.data.length > 0 && (
        <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
          {task.data.map((item, index) => {
            const isLabeled = item.labels.length;
            return (
              <div className="w-100 mb-2 border p-3 rounded" key={index}>
                <div className="w-100 d-flex justify-content-betweeen">
                  <label
                    className="w-100 fs-5 fw-bold"
                    data-bs-toggle="collapse"
                    data-bs-target={"#label_" + index}
                    role="button"
                  >
                    Data:
                  </label>
                  <Chip
                    label={isLabeled > 0 ? "labeled" : "unlabeled"}
                    variant="filled"
                  />
                </div>
                <div className="d-flex">
                  <label
                    className="fs-6 ps-4"
                    data-bs-toggle="collapse"
                    data-bs-target={"#label_" + index}
                    role="button"
                    style={{ width: "90%", textAlign: "justify" }}
                  >
                    {item.text}
                  </label>
                  <div
                    className="d-flex align-items-end justify-content-end my-3"
                    style={{ width: "10%" }}
                  >
                    <CircularProgressWithLabel
                      value={
                        task.worker.length != 0
                          ? Math.floor((isLabeled / task.worker.length) * 100)
                          : 0
                      }
                    />
                  </div>
                </div>
                <div className="d-flex align-items-end justify-content-end my-3">
                  <div className="me-4">Base Price : Rp. {item.price}</div>
                  <div>Total Price : Rp. {item.labels.length * item.price}</div>
                </div>
                <div id={"label_" + index} className="collapse">
                  <ListLabel label={item.labels} key={index} />
                </div>
              </div>
            );
          })}
        </div>
      )}
      {task.data == 0 && (
        <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm fw-bold fs-5">
          No data
        </div>
      )}
    </>
  );
}

export async function userTaskDetail({ params }: any) {
  const { getToken } = useAuth();

  try {
    const response = await client.get("/task/id/" + params["task_id"], {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      params: {
        expand: 1,
      },
    });
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      return console.log(err.response?.data.message);
    }
    return console.log(err);
  }
}
