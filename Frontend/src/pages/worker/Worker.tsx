import MainLayout from "../../components/worker/MainLayout";
import {workerNavigation} from "../../route";

export default function Worker (){
    return(
        <>
            <MainLayout navigation={workerNavigation} role="Worker"></MainLayout>
        </>
    )
}