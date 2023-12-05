import MainLayout from "../../components/MainLayout";
import useAuth from "../../customHooks/authenticate";
import { adminNavigation } from "../../route";
export default function Admin() {
  const { getUser } = useAuth();
  return (
    <MainLayout navigation={adminNavigation} user={getUser()}></MainLayout>
  );
}
