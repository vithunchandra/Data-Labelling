import { AxiosError } from "axios";
import Task from "../../components/admin/Task";
import useAuth from "../../customHooks/authenticate";
import { client } from "../../api/client";
import { useLoaderData } from "react-router-dom";

export default function AdminTask() {
  const data = useLoaderData();

  return (
    <>
      <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
        <div className="fw-bold fs-4 mb-2">Task</div>
        <Task data={data}></Task>
      </div>
    </>
  );
}

export async function getTasks({ params }: any) {
  const { getToken } = useAuth();

  try {
    let loaderObject = {};
    let response = await client.get("admin/all_tasks", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    loaderObject = {
      ...loaderObject,
      task: response.data,
    };
    response = await client.get("task_type/", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    loaderObject = {
      ...loaderObject,
      taskType: response.data,
    };
    return loaderObject;
  } catch (err) {
    if (err instanceof AxiosError) {
      return console.log(err.response?.data.message);
    }
    return console.log(err);
  }
}
