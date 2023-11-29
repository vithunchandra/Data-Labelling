import MainLayout from "../../components/MainLayout";
import {workerNavigation} from "../../route";
import useAuth from "../../customHooks/authenticate";
import { client } from "../../api/client";

export default function Worker(){
    const {getUser} = useAuth()
    return(
        <>
            <MainLayout navigation={workerNavigation} user={getUser()}></MainLayout>
        </>
    )
}