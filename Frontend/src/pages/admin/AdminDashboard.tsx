import { useSelector, useDispatch } from "react-redux";

import UserList from '../../components/admin/UserList';

export default function AdminDashboard() {
  const user = useSelector((state) => state.user.listUser);
  return (
    <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
        <div className="fw-bold fs-4 mb-2">User</div>
      <UserList user={user}></UserList>
    </div>
  );
}
