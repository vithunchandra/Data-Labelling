import { Button, FormControl, MenuItem } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";

export default function UserList({ data }) {
  const user = data.users;
  const tasks = data.finishedTask;
  const requester = [];
  const worker = [];
  let temp = [];

  tasks.map((task) => {
    let tempPriceRequester = 0;
    let tempPriceWorker = 0;
    task.data.map((temp) => {
      tempPriceRequester += temp.labels.length * temp.price;
      tempPriceWorker = temp.price;
      temp.labels.map((label) => {
        const tempDataWorker = {
          name: label.worker.name,
          money: tempPriceWorker,
        };
        const existingIndex = worker.findIndex(
          (e) => e.name === label.worker.name
        );
        if (existingIndex !== -1) {
          worker[existingIndex].money += tempPriceWorker;
        } else {
          worker.push(tempDataWorker);
        }
      });
    });

    const tempDataRequester = {
      name: task.requester.name,
      money: tempPriceRequester,
    };
    const existingIndex = requester.findIndex(
      (e) => e.name === task.requester.name
    );

    if (existingIndex !== -1) {
      requester[existingIndex].money += tempPriceRequester;
    } else {
      requester.push(tempDataRequester);
    }
  });
  temp = [...worker, ...requester];

  const [role, setRole] = useState("Both");
  const [taskName, setTaskName] = useState("");
  const [currentFilter, setCurrentFilter] = useState(user);
  const handleRoleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRole(event.target.value as string);
  };

  const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const handleFilter = () => {
    let filteredUsers = user;

    if (role !== "Both") {
      filteredUsers = filteredUsers.filter(
        (u) => u.role === role.toLowerCase()
      );
    }

    if (taskName.trim() !== "") {
      filteredUsers = filteredUsers.filter((u) =>
        u.name.toLowerCase().includes(taskName.toLowerCase())
      );
    }

    setCurrentFilter(filteredUsers);
  };

  useEffect(() => {
    handleFilter();
  }, [role, taskName]);

  return (
    <>
      <div className="fs-5">Filters</div>
      <div className="row align-items-center g-0 mt-3 flex">
        <div className="col me-3">
          <FormControl fullWidth size="small">
            <InputLabel id="role">Role</InputLabel>
            <Select
              labelId="role"
              id="role"
              label="Role"
              value={role}
              onChange={handleRoleChange}
              fullWidth
              sx={{
                textTransform: "capitalize",
                width: "100%",
              }}
            >
              <MenuItem value="Both">Requester & Worker</MenuItem>
              <MenuItem value="Requester">Requester</MenuItem>
              <MenuItem value="Worker">Worker</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-auto flex-fill">
          <TextField
            variant="outlined"
            label="Name"
            size="small"
            fullWidth
            value={taskName}
            onChange={handleTaskNameChange}
            sx={{
              width: "100%",
            }}
          ></TextField>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th className="align-middle">No</th>
            <th className="align-middle">Name</th>
            <th className="align-middle ">Role</th>
            <th className="align-middle text-center">Credibility</th>
            <th className="align-middle">Wallet</th>
            <th className="align-middle">Income/Outcome</th>
            <th className="align-middle">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentFilter.map((user, index) => (
            <tr key={index}>
              <td className="align-middle">{index + 1}</td>
              <td className="align-middle">{user.name}</td>
              <td className="align-middle text-capitalize">{user.role}</td>
              {user.credibility !== 0 ? (
                <td className="align-middle text-center">{user.credibility}</td>
              ) : (
                <td></td>
              )}
              {user.wallet !== 0 ? (
                <td className="align-middle">Rp. {user.wallet}</td>
              ) : (
                <td></td>
              )}
              <td
                className={`align-middle ${
                  user.role === "worker" ? "text-success" : "text-danger"
                }`}
              >
                Rp.{" "}
                {temp.find((tempUser) => tempUser.name === user.name)?.money ||
                  0}
              </td>

              <td className="align-middle">
                <Link to={`/admin/user/${user._id}`}>
                  <Button variant="contained" startIcon={<InfoOutlinedIcon />}>
                    Detail
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
