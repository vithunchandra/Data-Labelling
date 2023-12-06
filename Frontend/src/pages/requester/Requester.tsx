import MainLayout from "../../components/MainLayout";
import useAuth from "../../customHooks/authenticate";
import { requesterNavigation } from "../../route";

export default function Requester() {
  const {getUser} = useAuth()
  return (
    <MainLayout navigation={requesterNavigation} user={getUser()}></MainLayout>
  );
}
