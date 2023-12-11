import { Avatar, Button, FormControl, MenuItem } from "@mui/material";
import Task from "../../interface/TaskInterface";
import task_type from "../../dummy_data/task_type.json";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

export default function Task({ task }: { task: Task[] }) {
  const [type, setType] = useState("all");
  const [taskName, setTaskName] = useState("");
  const [requesterName, setRequesterName] = useState("");
  const [currentTask, setCurrentTask] = useState(task);

  const handleTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);
  };
  const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };
  const handleRequesterNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRequesterName(event.target.value);
  };

  const handleFilter = () => {
    const filteredTasks = task.filter((item) => {
      console.log(item);

      const filterByType =
        type === "all" ||
        item.task_type.name.toLowerCase().includes(type.toLowerCase());
      const filterByTaskName = item.task_name
        .toLowerCase()
        .includes(taskName.toLowerCase());
      const filterByRequesterName = item.requester.name
        .toLowerCase()
        .includes(requesterName.toLowerCase());
      return filterByType && filterByTaskName && filterByRequesterName;
    });
    setCurrentTask(filteredTasks);
  };

  useEffect(() => {
    handleFilter();
  }, [type, taskName, requesterName]);

  return (
    <>
      <div className="fs-5">Filters</div>
      <div className="row align-items-center g-0 mt-3 flex">
        <div className="col-4 me-3">
          <FormControl fullWidth size="small">
            <InputLabel id="type">Task Type</InputLabel>
            <Select
              labelId="type"
              id="type"
              label="Type"
              value={type}
              onChange={handleTypeChange}
              fullWidth
              sx={{
                textTransform: "capitalize",
                width: "100%",
              }}
            >
              <MenuItem value="all">All Type</MenuItem>
              {task_type.map((item, index) => (
                <MenuItem key={index} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-2 flex-fill me-3">
          <TextField
            variant="outlined"
            label="Task Name"
            size="small"
            fullWidth
            value={taskName}
            onChange={handleTaskNameChange}
            sx={{
              width: "100%",
            }}
          ></TextField>
        </div>
        <div className="col-2 flex-fill">
          <TextField
            variant="outlined"
            label="Requester Name"
            size="small"
            fullWidth
            value={requesterName}
            onChange={handleRequesterNameChange}
            sx={{
              width: "100%",
            }}
          ></TextField>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th className="align-middle col-1">No</th>
            <th className="align-middle col-3">Nama</th>
            <th className="align-middle col-3">Requester</th>
            <th className="align-middle col-2">Type</th>
            <th className="align-middle text-center col-1">Total Data</th>
            <th className="align-middle col-2">Closed Date</th>
            <th className="align-middle col-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentTask.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No data found
              </td>
            </tr>
          ) : (
            currentTask.map((item, index) => {
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
                      <div className="fw-bold">{item.requester.name}</div>
                    </div>
                  </td>
                  <td className="align-middle">{item.task_type.name}</td>
                  <td className="align-middle text-center">
                    {item.data.length}
                  </td>
                  <td className="align-middle">
                    <span className="text-secondary">
                      {new Date(item.end_date).toDateString()}
                    </span>
                  </td>
                  <td className="align-middle">
                    <Link to={item._id}>
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
    </>
  );
}
