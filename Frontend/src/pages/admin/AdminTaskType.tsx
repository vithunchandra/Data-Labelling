import React, { useState } from "react";
import taskType from "../../dummy_data/task_type.json";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function AdminTaskType() {
  const [data, setData] = useState(taskType);
  const [editIndex, setEditIndex] = useState(null);
  const [price, setPrice] = useState(0);

  const handleEdit = (index) => {
    setEditIndex(index);
    setPrice(data[index].price);
  };

  const handleSave = (index) => {
    const newData = [...data];
    newData[index].price = price;
    setData(newData);
    setEditIndex(null);
  };

  return (
    <div className="container">
      <Link to={'/admin/task_type/add_task'}>
        <Button variant="contained">Add Task</Button>
      </Link>
      <h1 className="my-3">Admin Task Type</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((type, index) => (
            <tr key={index}>
              <td>{type._id}</td>
              <td>{type.name}</td>
              <td>
                {editIndex === index ? (
                  <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                ) : (
                  type.price
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <button onClick={() => handleSave(index)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(index)}>Edit Price</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
