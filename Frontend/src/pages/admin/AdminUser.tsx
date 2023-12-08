import { client } from "../../api/client";
import UserList from "../../components/admin/UserList";
import useAuth from "../../customHooks/authenticate";
import { AxiosError } from "axios";
import { useLoaderData } from "react-router-dom";

export default function AdminUser() {
  const users = useLoaderData();
  return (
    <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
      <div className="fw-bold fs-4 mb-2">User</div>
      <UserList user={users}></UserList>
    </div>
  );
}

export async function getUsers({ params }: any) {
  const { getToken } = useAuth();

  try {
    const response = await client.get("admin/all_users", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      params: {
        expand: 1,
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
