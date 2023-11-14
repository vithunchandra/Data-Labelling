import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTaskType from "./pages/admin/AdminTaskType";
import AdminKeuangan from "./pages/admin/AdminKeuangan";
import RequesterDashboard from "./pages/requester/RequesterDashboard";
import CreateTask from "./pages/requester/CreateTask";
import Marketplace from "./pages/worker/Marketplace";
import WorkerDashboard from "./pages/worker/WorkerDashboard";
import WorkerTask from "./pages/worker/WorkerTask";
import TopUp from "./pages/requester/TopUp";
import MonitorTask from "./pages/requester/MonitorTask";
import { Assignment, Dashboard, ListAlt, Wallet } from "@mui/icons-material";
import MyWallet from "./pages/worker/MyWallet";

export const workerNavigation = [
  {
    name: "Dashboard",
    icon: <Dashboard color="info" sx={{fontSize: '30px'}}/>,
    element: <WorkerDashboard />,
    path: "/worker",
  },
  {
    name: "Marketplace",
    icon: <ListAlt color="warning" sx={{fontSize: '30px'}}/>,
    element: <Marketplace />,
    path: "/worker/marketplace",
  },
  {
    name: "Task",
    icon: <Assignment color="primary" sx={{fontSize: '30px'}}/>,
    element: <WorkerTask />,
    path: "/worker/task",
  },
  {
    name: "Wallet",
    icon: <Wallet color="success" sx={{fontSize: '30px'}}/>,
    element: <MyWallet />,
    path: '/worker/wallet'
  }
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
    path: "/requester/create_task",
  },
  {
    name: "Monitor Task",
    icon: <i className="bi bi-monitortask"></i>,
    element: <MonitorTask />,
    path: "/requester/monitor_task",
  },
  {
    name: "Top Up",
    icon: <i className="bi bi-topup"></i>,
    element: <TopUp />,
    path: "/requester/top_up",
  },
];

export const adminNavigation = [
  {    
    name: "Dashboard",
    icon: <i className="bi bi-house"></i>,
    element: <AdminDashboard />,
    path: "/admin",
  },
  {    
    name: "Task Type",
    icon: <i className="bi bi-house"></i>,
    element: <AdminTaskType />,
    path: "/admin/task_type",
  },
  {    
    name: "Laporan Keuangan",
    icon: <i className="bi bi-house"></i>,
    element: <AdminKeuangan />,
    path: "/admin/keuangan",
  }
]