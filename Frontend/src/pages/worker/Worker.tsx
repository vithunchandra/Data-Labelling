import { useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import {workerNavigation} from "../../route";
import { redirect, useNavigate, useResolvedPath } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { IUser } from "../../interface/IUser";

export default function Worker (){
    return(
        <>
            <MainLayout navigation={workerNavigation} role="Worker"></MainLayout>
        </>
    )
}