import TaskType from "../../interface/TaskTypeInterface";
import { useState } from "react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { setPrice } from "../../redux/tasktypeSlice";
import { useSelector, useDispatch } from "react-redux";

export default function TaskType({ TaskType }: { TaskType: TaskType[] }) {
  const data = useSelector((state) => state.task_type.listTasktype);

  const [editIndex, setEditIndex] = useState(null);
  const [tempID, setTempID] = useState(0);
  const [tempPrice, setTempPrice] = useState(0);
  const dispatch = useDispatch();

  const handleEdit = (index) => {
    setEditIndex(index);
    setTempID(data[index]._id);
    setTempPrice(data[index].price);
  };

  const handleSave = () => {
    dispatch(setPrice({ tempID, tempPrice }));
    setEditIndex(null);
  };
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Price</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {TaskType.map((type, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{type.name}</td>
              <td>
                {editIndex === index ? (
                  <input
                    value={tempPrice}
                    onChange={(e) => setTempPrice(e.target.value)}
                  />
                ) : (
                  type.price
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <Button
                    startIcon={<SaveIcon />}
                    variant="contained"
                    color="success"
                    onClick={() => handleSave(index)}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={"add"}>
        <IconButton
          className="position-fixed fixed-bottom"
          style={{
            width: "7.5%",
            height: "7.5",
            marginBottom: "0%",
            marginLeft: "90%",
          }}
        >
          <AddCircleIcon sx={{ fontSize: "100px" }}></AddCircleIcon>
        </IconButton>
      </Link>
    </div>
  );
}
