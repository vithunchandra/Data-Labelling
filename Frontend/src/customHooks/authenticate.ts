import { decodeToken } from "react-jwt"
import IUser from "../interface/IUser";

export default function useAuth(){
  function getToken(){
    return localStorage.getItem('access_token');
  }

  function getUser(){
    const token = localStorage.getItem('access_token')
    const user = (decodeToken(token!) as any).user as IUser
    return user
  }

  function login(access_token: string){
    localStorage.setItem('access_token', access_token)
  }

  function logout(){
    localStorage.removeItem('access_token')
  }

  return {getToken, getUser, login, logout}
}