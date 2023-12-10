import React, { useEffect, useState } from "react";
import TaskType from "../../components/admin/TaskType";
import useAuth from "../../customHooks/authenticate";
import { AxiosError } from "axios";
import { client } from "../../api/client";
import { useLoaderData } from "react-router-dom";

export default function AdminTaskType() {
  const [taskTypeData, setTaskTypeData] = useState(null);
  const loaderData = useLoaderData();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTaskTypes();
        setTaskTypeData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
      <div className="fw-bold fs-4 mb-2">Task Type</div>
      <TaskType TaskType={loaderData}></TaskType>
    </div>
  );
}

export async function getTaskTypes() {
  const { getToken } = useAuth();

  try {
    const response = await client.get("task_type", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw err.response?.data.message;
    }
    throw err;
  }
}

export async function editTasktype({
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
    const task_type = await client.put(
      "task_type/edit",
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
