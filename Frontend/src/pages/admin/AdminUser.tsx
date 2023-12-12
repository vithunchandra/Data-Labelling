import { client } from "../../api/client";
import UserList from "../../components/admin/UserList";
import useAuth from "../../customHooks/authenticate";
import { AxiosError } from "axios";
import { useLoaderData } from "react-router-dom";

export default function AdminUser() {
  const data = useLoaderData();
  
  return (
    <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
      <div className="fw-bold fs-4 mb-2">User</div>
      <UserList data={data}></UserList>
    </div>
  );
}

export async function getUsers({ params }: any) {
  const { getToken } = useAuth();

  try {
    let loaderObject = {};
    let response = await client.get("admin/all_users", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    loaderObject = {
      ...loaderObject,
      users: response.data,
      totalUser: response.data.length,
    };
    response = await client.get("admin/closed_task", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    loaderObject = {
      ...loaderObject,
      finishedTask: response.data,
      totalFinishedTask: response.data.length,
    };
    return loaderObject;
  } catch (err) {
    if (err instanceof AxiosError) {
      return console.log(err.response?.data.message);
    }
    return console.log(err);
  }
}
