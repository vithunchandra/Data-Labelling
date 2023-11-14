import User from "../../interface/UserInterface";
import { Button, FormControl, MenuItem } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

export default function UserList({ user }: { user: User[] }) {
  const [role, setRole] = useState("both");
  const [taskName, setTaskName] = useState("");

  const handleRoleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRole(event.target.value as string);
  };

  const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };
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
              <MenuItem value="both">Requester & Worker</MenuItem>
              <MenuItem value="requester">Requester</MenuItem>
              <MenuItem value="worker">Worker</MenuItem>
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
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="align-middle">ID</th>
            <th className="align-middle">Name</th>
            <th className="align-middle">Role</th>
            <th className="align-middle text-center">Credibility</th>
            <th className="align-middle">Wallet</th>
            <th className="align-middle">Action</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user, index) => (
            <tr key={index}>
              <td className="align-middle">{index+1}</td>
              <td className="align-middle">{user.name}</td>
              <td className="align-middle">{user.role}</td>
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
              <td className="align-middle">
                {" "}
                <Button variant="contained" startIcon={<InfoOutlinedIcon />}>
                  Detail
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
