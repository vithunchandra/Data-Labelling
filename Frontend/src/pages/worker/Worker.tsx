import MainLayout from "../../components/MainLayout";
import {workerNavigation} from "../../route";

export default function Worker (){
    return(
        <>
            <MainLayout navigation={workerNavigation} role="Worker"></MainLayout>
        </>
    )
}