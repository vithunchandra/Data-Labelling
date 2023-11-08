import RequesterDashboard from "./pages/requester/RequesterDashboard";
import CreateTask from "./pages/requester/CreateTask";
import Marketplace from "./pages/worker/Marketplace";
import WorkerDashboard from "./pages/worker/WorkerDashboard";
import WorkerTask from "./pages/worker/WorkerTask";
import TopUp from "./pages/requester/TopUp";

export const workerNavigation = [
  {
    name: "Dashboard",
    icon: <i className="bi bi-house"></i>,
    element: <WorkerDashboard />,
    path: "/worker",
  },
  {
    name: "Marketplace",
    icon: <i className="bi bi-shop"></i>,
    element: <Marketplace />,
    path: "/worker/marketplace",
  },
  {
    name: "Task",
    icon: <i className="bi bi-list-task"></i>,
    element: <WorkerTask />,
    path: "/worker/task",
  },
];

export const requesterNavigation = [
  {
    name: "Dashboard",
    icon: <i className="bi bi-house"></i>,
    element: <RequesterDashboard />,
    path: "/requester",
  },
  {
    name: "Create Task",
    icon: <i className="bi bi-createtask"></i>,
    element: <CreateTask />,
    path: "/requester/create+task",
  },
  {
    name: "Top Up",
    icon: <i className="bi bi-topup"></i>,
    element: <TopUp />,
    path: "/requester/top+up",
  },
];
