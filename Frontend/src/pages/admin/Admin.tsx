import MainLayout from "../../components/MainLayout";
import { adminNavigation } from "../../route";
export default function Admin (){
    return(        
        <MainLayout navigation={adminNavigation} role="Admin"></MainLayout>
    )
}