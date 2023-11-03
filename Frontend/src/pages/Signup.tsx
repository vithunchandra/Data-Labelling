import {Link, Outlet} from 'react-router-dom'

export default function Signup(){
    return(
        <div>
            <h1>Signup</h1>
            <Link to="/admin">Admin</Link>
            <Link to='/requester'>Requester</Link>
            <Link to='/worker'>Worker</Link>
        </div>

    )
}