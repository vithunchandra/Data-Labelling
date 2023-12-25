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

  tasks.forEach((task) => {
    let tempPriceRequester = 0;
    let tempPriceWorker = 0;
    task.data.forEach((tempData) => {
      tempPriceRequester += tempData.labels.length * tempData.price;
      tempPriceWorker = tempData.price;
      tempData.labels.forEach((label) => {
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
  const [currentFilter, setCurrentFilter] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [paginatedUsers, setPaginatedUsers] = useState([]);
  const usersPerPage = 10;

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleFilter = () => {
    let filteredUsers = user;
    if (role !== "Both") {
      filteredUsers = filteredUsers.filter(
        (u) => u.role.toLowerCase() === role.toLowerCase()
      );
    }

    if (taskName.trim() !== "") {
      filteredUsers = filteredUsers.filter((u) =>
        u.name.toLowerCase().includes(taskName.toLowerCase())
      );
    }

    setCurrentFilter(filteredUsers);
    setCurrentPage(0);
    applyPagination(filteredUsers);
  };

  const applyPagination = (users) => {
    const startIndex = currentPage * usersPerPage;
    const paginatedData = users.slice(startIndex, startIndex + usersPerPage);
    setPaginatedUsers(paginatedData);
  };

  const updatePage = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    handleFilter();
  }, [role, taskName, user]);

  useEffect(() => {
    applyPagination(currentFilter);
  }, [currentPage, currentFilter]);

  return (
    <>
      <div className="fs-5">Filters</div>
      <div className="row align-items-center g-0 mt-3 flex">
        <div className="col me-3">
          <FormControl fullWidth size="small">
            <InputLabel id="role">Role</InputLabel>
            <Select
              labelId="role"
              id="input-role"
              label="Role"
              value={role}
              onChange={handleRoleChange}
              fullWidth
              sx={{
                textTransform: "capitalize",
                width: "100%",
              }}
            >
              <MenuItem value="Both" id="cb-both">
                Requester & Worker
              </MenuItem>
              <MenuItem value="Requester" id="cb-requester">
                Requester
              </MenuItem>
              <MenuItem value="Worker" id="cb-worker">
                Worker
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-auto flex-fill">
          <TextField
            variant="outlined"
            id="input-name"
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
        <table className="table">
          <thead>
            <tr>
              <th className="align-middle">No</th>
              <th className="align-middle">Name</th>
              <th className="align-middle">Role</th>
              <th className="align-middle text-center">Credibility</th>
              <th className="align-middle">Wallet</th>
              <th className="align-middle">Income/Outcome</th>
              <th className="align-middle">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr key={index}>
                <td className="align-middle">
                  {index + 1 + currentPage * usersPerPage}
                </td>
                <td className="align-middle">{user.name}</td>
                <td className="align-middle text-capitalize">{user.role}</td>
                {user.credibility !== 0 ? (
                  <td className="align-middle text-center">
                    {user.credibility}
                  </td>
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
                  {temp.find((tempUser) => tempUser.name === user.name)
                    ?.money || 0}
                </td>
                <td className="align-middle">
                  <Link to={`/admin/user/${user._id}`}>
                    <Button
                      variant="contained"
                      startIcon={<InfoOutlinedIcon />}
                      id={`detail${index + 1 + currentPage * usersPerPage}`}
                    >
                      Detail
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </table>
      <div className="d-flex justify-content-between">
        <Button
          type="button"
          className={`me-3 ${currentPage === 0 ? "invisible" : ""}`}
          variant="contained"
          onClick={() => updatePage(Math.max(currentPage - 1, 0))}
          id="btn-prev"
        >
          Previous
        </Button>
        <div>{currentPage + 1}</div>
        <Button
          type="button"
          className={`${
            (currentPage + 1) * usersPerPage >= currentFilter.length
              ? "invisible"
              : ""
          }`}
          variant="contained"
          onClick={() =>
            updatePage(
              Math.min(
                currentPage + 1,
                Math.ceil(currentFilter.length / usersPerPage) - 1
              )
            )
          }
          id="btn-next"
        >
          Next
        </Button>
      </div>
    </>
  );
}
