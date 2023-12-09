import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useAuth from "../../customHooks/authenticate";
import { AxiosError } from "axios";
import { client } from "../../api/client";

export default function AddTaskType() {
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm();
  const [taskHeader, setTaskHeader] = useState<{
    name: string;
    price: number;
  }>();
  const navigate = useNavigate();
  const fetcher = useFetcher();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        fetcher.submit(data, {
          method: "post",
          encType: "application/x-www-form-urlencoded",
          action: "/admin/task_type/add",
        });
        reset();
        navigate("/admin/task_type");
      })}
    >
      <div className="d-flex justify-content-between">
        <Button
          color="info"
          variant="contained"
          startIcon={<ArrowBackIosIcon />}
          onClick={() => navigate("..", { relative: "path" })}
        >
          Back
        </Button>
        <Button
          color="success"
          variant="contained"
          size="large"
          type="submit"
          startIcon={<DoneAllIcon />}
        >
          Done
        </Button>
      </div>
      <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
        <div className="form-group mb-3">
          <label className="mb-1 fs-4">Name: </label>
          <input
            type="text"
            defaultValue={taskHeader?.name}
            className="form-control"
            required
            {...register("name")}
            placeholder="Name"
          />
        </div>
        <div className="form-group mb-3">
          <label className="mb-1 fs-4">Price : </label>
          <input
            type="text"
            defaultValue={taskHeader?.price}
            className="form-control"
            required
            {...register("price")}
            placeholder="Price"
          />
        </div>
      </div>
    </form>
  );
}

export async function addTasktype({
  request,
  params,
}: {
  request: any;
  params: any;
}) {
  const { getToken } = useAuth();
  const formData = await request.formData();
  const name = formData.get("name");
  const price = formData.get("price");

  try {
    const task_type = await client.post(
      "task_type/create",
      { name, price },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    return task_type.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      return console.log(err.response?.data.message);
    }
    return console.log(err);
  }
}
