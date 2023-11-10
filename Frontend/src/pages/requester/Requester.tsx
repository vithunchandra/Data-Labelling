import MainLayout from "../../components/worker/MainLayout";
import { requesterNavigation } from "../../route";

export default function Requester() {
  return (
    <MainLayout navigation={requesterNavigation} role="Requester"></MainLayout>
  );
}
