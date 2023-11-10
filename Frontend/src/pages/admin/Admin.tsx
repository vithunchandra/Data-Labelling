import MainLayout from "../../components/worker/MainLayout";
import { adminNavigation } from "../../route";
export default function Admin (){
    return(        
        <MainLayout navigation={adminNavigation} role="Admin"></MainLayout>
    )
}