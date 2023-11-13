import user from "../../dummy_data/user.json";
import UserList from '../../components/admin/UserList';

export default function AdminDashboard() {
  return (
    <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
        <div className="fw-bold fs-4 mb-2">User</div>
      <UserList user={user}></UserList>

    </div>
  );
}
