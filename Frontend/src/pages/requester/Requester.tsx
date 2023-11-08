import MainLayout from "../../components/dashboard/MainLayout";
import { requesterNavigation } from "../../route";

export default function Requester() {
  return (
    <MainLayout navigation={requesterNavigation} role="Requester"></MainLayout>
  );
}
