import { AxiosError } from "axios";
import Task from "../../components/admin/Task";
import useAuth from "../../customHooks/authenticate";
import { client } from "../../api/client";
import { useLoaderData } from "react-router-dom";

export default function AdminTask() {
  const task = useLoaderData();
  
  return (
    <>
      <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
        <div className="fw-bold fs-4 mb-2">Task</div>
        <Task task={task}></Task>
      </div>
    </>
  );
}

export async function getTasks({ params }: any) {
  const { getToken } = useAuth();

  try {
    const response = await client.get("admin/all_tasks", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      return console.log(err.response?.data.message);
    }
    return console.log(err);
  }
}
