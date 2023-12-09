import { Navigate } from "react-router-dom";
import useAuth from "../../customHooks/authenticate";
import IUser from "../../interface/IUser";

export default function Authenticate({role, children} : {role: string, children: React.JSX.Element}){
    const { getUser, getToken } = useAuth()
    const user: IUser = getUser()

    if(!user){
        return <Navigate to={'/signin'}></Navigate>
    }else if(user.role !== role){
        return <Navigate to={`/${user.role}`}></Navigate>
    }else{
        return (children)
    }
}