import { Button } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addTasktype } from "../../redux/tasktypeSlice";

export default function AddTaskType() {
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm();
  const [taskHeader, setTaskHeader] = useState<{
    name: string;
    price: number;
  }>();
  const navigate = useNavigate();
  return (
    <form
      onSubmit={handleSubmit((data) => {
        setTaskHeader({
          name: data.name,
          price: data.price,
        });
        const newData = {
          name: data.name,
          price: data.price 
        }
        reset();
        dispatch(addTasktype(newData));
        navigate("/admin/task_type");
      })}
    >
      <div className="d-flex justify-content-end">
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
