import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

export default function Task({ data }) {
  const task = data.task;
  const task_type = data.taskType;
  const [type, setType] = useState("all");
  const [taskName, setTaskName] = useState("");
  const [requesterName, setRequesterName] = useState("");
  const [currentTask, setCurrentTask] = useState(task);
  const [currentPage, setCurrentPage] = useState(0);
  const [paginatedTasks, setPaginatedTasks] = useState([]);
  const tasksPerPage = 10;

  task.map((item) => {
    let tempPrice = 0;
    item.data.forEach((data) => {
      tempPrice += data.price * data.labels.length;
    });
    item.tempPrice = tempPrice;
    return item;
  });
  console.log(task);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleRequesterNameChange = (event) => {
    setRequesterName(event.target.value);
  };

  const updatePage = (newPage) => {
    setCurrentPage(newPage);
    const startIndex = newPage * tasksPerPage;
    setPaginatedTasks(currentTask.slice(startIndex, startIndex + tasksPerPage));
  };

  useEffect(() => {
    const filteredTasks = task.filter((item) => {
      const filterByType =
        type === "all" ||
        item.task_type.name.toLowerCase() === type.toLowerCase();
      const filterByTaskName = item.task_name
        .toLowerCase()
        .includes(taskName.toLowerCase());
      const filterByRequesterName = item.requester.name
        .toLowerCase()
        .includes(requesterName.toLowerCase());
      return filterByType && filterByTaskName && filterByRequesterName;
    });
    setCurrentTask(filteredTasks);
    setCurrentPage(0);
  }, [type, taskName, requesterName]);

  useEffect(() => {
    const startIndex = currentPage * tasksPerPage;
    const paginatedData = currentTask.slice(
      startIndex,
      startIndex + tasksPerPage
    );
    setPaginatedTasks(paginatedData);
  }, [currentPage, currentTask]);
  return (
    <>
      <div className="fs-5">Filters</div>
      <div className="row align-items-center g-0 mt-3 flex">
        <div className="col-4 me-3">
          <FormControl fullWidth size="small">
            <InputLabel id="type">Task Type</InputLabel>
            <Select
              labelId="type"
              id="input-type"
              label="Type"
              value={type}
              onChange={handleTypeChange}
              fullWidth
              sx={{
                width: "100%",
              }}
            >
              <MenuItem value="all" id="all">
                All Type
              </MenuItem>
              {task_type.map((item, index) => (
                <MenuItem key={index} value={item.name} id={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-2 flex-fill me-3">
          <TextField
            id="input-task_name"
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
            id="input-requester_name"
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
            <th className="align-middle col-2">Nama</th>
            <th className="align-middle col-2">Requester</th>
            <th className="align-middle col-2">Type</th>
            <th className="align-middle text-center col-1">Total Data</th>
            <th className="align-middle col-2">Closed Date</th>
            <th className="align-middle col-2">Price</th>
            <th className="align-middle col-1">Action</th>
          </tr>
        </thead>{" "}
        <tbody>
          {paginatedTasks.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">
                No data found
              </td>
            </tr>
          ) : (
            paginatedTasks.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="align-middle">
                    {index + 1 + currentPage * 10}
                  </td>
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
                  <td className="align-middle">Rp. {item.tempPrice}</td>
                  <td className="align-middle">
                    <Link to={item._id}>
                      <Button
                        variant="contained"
                        startIcon={<InfoOutlinedIcon />}
                        id={`detailTask${index + 1 + currentPage * 10}`}
                      >
                        Detail
                      </Button>
                    </Link>
                  </td>{" "}
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      <div className="d-flex justify-content-between">
        <Button
          type="button"
          className={`me-3 ${currentPage === 0 ? "invisible" : ""}`}
          variant="contained"
          startIcon={<ChevronLeft />}
          onClick={() => updatePage(Math.max(currentPage - 1, 0))}
        >
          Previous
        </Button>
        <div className="mx-3">{currentPage + 1}</div>
        <Button
          type="button"
          className={`${
            (currentPage + 1) * tasksPerPage >= currentTask.length
              ? "invisible"
              : ""
          }`}
          variant="contained"
          endIcon={<ChevronRight />}
          onClick={() =>
            updatePage(
              Math.min(
                currentPage + 1,
                Math.ceil(currentTask.length / tasksPerPage) - 1
              )
            )
          }
        >
          Next
        </Button>
      </div>
    </>
  );
}
