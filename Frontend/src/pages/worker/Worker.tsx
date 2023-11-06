import MainLayout from "../../components/dashboard/MainLayout";
import {workerNavigation} from "../../route";

export default function Worker (){
    return(
        <>
            <MainLayout navigation={workerNavigation} role="Worker"></MainLayout>
        </>
    )
}