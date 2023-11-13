import User from "../../interface/UserInterface";
import { Button } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function UserList({user} : {user : User[]}){
    return(
        <table className="table table-striped">
        <thead>
          <tr>
            <th className="align-middle">ID</th>
            <th className="align-middle">Name</th>
            <th className="align-middle">Role</th>
            <th className="align-middle text-center">Credibility</th>
            <th className="align-middle">Wallet</th>
            <th className="align-middle">Action</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user, index) => (
            <tr key={index}>
              <td className="align-middle">{user._id}</td>
              <td className="align-middle">{user.name}</td>
              <td className="align-middle">{user.role}</td>
              {user.credibility !== 0 ? <td className="align-middle text-center">{user.credibility}</td> : <td></td>}
              {user.wallet !== 0 ? <td className="align-middle">Rp. {user.wallet}</td> : <td></td>}
              <td className="align-middle"> <Button variant="contained" startIcon={<InfoOutlinedIcon />}>Detail</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    )
}