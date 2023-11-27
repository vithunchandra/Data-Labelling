import { decodeToken } from "react-jwt"
import { IUser } from "../interface/IUser";

export default function useAuth(){
  function getUser(){
    const token = localStorage.getItem('access_token')
    const user = (decodeToken(token!) as any).user as IUser
    return user
  }

  function login(access_token){
    localStorage.setItem('access_token', access_token)
  }

  function logout(){
    localStorage.removeItem('access_token')
  }

  return {getUser, login, logout}
}