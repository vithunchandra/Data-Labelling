import user from "../../dummy_data/user.json";

export default function AdminDashboard() {
  return (
    <div className="container">
      <h1 className="my-3">Admin Liat User</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Credibility</th>
            <th>Wallet</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user, index) => (
            <tr key={index}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              {user.credibility !== 0 ? <td>{user.credibility}</td> : <td></td>}
              {user.wallet !== 0 ? <td>Rp. {user.wallet}</td> : <td></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
