import User from "../../interface/UserInterface";

export default function DashboardUser({ user }: { user: User[] }) {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th className="align-middle col-1">No</th>
            <th className="align-middle col-2">Name</th>
            <th className="align-middle col-1">Role</th>
            <th className="align-middle text-center col-1">Credibility</th>
            <th className="align-middle col-2">Wallet</th>
          </tr>
        </thead>
        <tbody>
          {user.map((item, index) => (
            <tr key={index}>
              <td className="align-middle">{index + 1}</td>
              <td className="align-middle">{item.name}</td>
              <td className="align-middle text-capitalize">{item.role}</td>
              {item.credibility !== 0 ? (
                <td className="align-middle text-center">{item.credibility}</td>
              ) : (
                <td></td>
              )}
              {item.wallet !== 0 ? (
                <td className="align-middle">Rp. {item.wallet}</td>
              ) : (
                <td></td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
