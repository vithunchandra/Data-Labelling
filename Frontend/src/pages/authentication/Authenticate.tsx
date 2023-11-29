import { Navigate } from "react-router-dom";
import useAuth from "../../customHooks/authenticate";
import IUser from "../../interface/IUser";
import { client } from "../../api/client";

export default function Authenticate({role, children} : {role: string, children: React.JSX.Element}){
    const { getUser, getToken } = useAuth()
    const user: IUser = getUser()
    // client.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`

    if(!user){
        return <Navigate to={'/signin'}></Navigate>
    }else if(user.role !== role){
        return <Navigate to={`/${user.role}`}></Navigate>
    }else{
        return (children)
    }
}