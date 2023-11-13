import MainLayout from "../../components/MainLayout";
import { requesterNavigation } from "../../route";

export default function Requester() {
  return (
    <MainLayout navigation={requesterNavigation} role="Requester"></MainLayout>
  );
}
