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
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ScreenSearchDesktopIcon from "@mui/icons-material/ScreenSearchDesktop";
import ConstructionIcon from "@mui/icons-material/Construction";
import PaidIcon from "@mui/icons-material/Paid";
import BlockIcon from "@mui/icons-material/Block";
import BanList from "./pages/requester/BanList";
import AdminUser from "./pages/admin/AdminUser";
import AdminTask from "./pages/admin/AdminTask";

export const workerNavigation = [
  {
    name: "Dashboard",
    icon: <Dashboard color="info" sx={{ fontSize: "30px" }} />,
    element: <WorkerDashboard />,
    path: "/worker",
  },
  {
    name: "Marketplace",
    icon: <ListAlt color="warning" sx={{ fontSize: "30px" }} />,
    element: <Marketplace />,
    path: "/worker/marketplace",
  },
  {
    name: "Task",
    icon: <Assignment color="primary" sx={{ fontSize: "30px" }} />,
    element: <WorkerTask />,
    path: "/worker/task",
  },
  {
    name: "Wallet",
    icon: <Wallet color="success" sx={{ fontSize: "30px" }} />,
    element: <MyWallet />,
    path: "/worker/wallet",
  },
];

export const requesterNavigation = [
  {
    name: "Dashboard",
    icon: <DashboardIcon color="primary" sx={{ fontSize: "30px" }} />,
    element: <RequesterDashboard />,
    path: "/requester",
  },
  {
    name: "Create Task",
    icon: <ConstructionIcon color="error" sx={{ fontSize: "30px" }} />,
    element: <CreateTask />,
    path: "/requester/create_task",
  },
  {
    name: "Monitor Task",
    icon: (
      <ScreenSearchDesktopIcon color="secondary" sx={{ fontSize: "30px" }} />
    ),
    element: <MonitorTask />,
    path: "/requester/monitor_task",
  },
  {
    name: "Ban List",
    icon: <BlockIcon color="error" sx={{ fontSize: "30px" }} />,
    element: <BanList />,
    path: "/requester/ban_list",
  },
  {
    name: "Top Up",
    icon: <PaidIcon sx={{ fontSize: "30px", color: "orange" }} />,
    element: <TopUp />,
    path: "/requester/top_up",
  },
];

export const adminNavigation = [
  {
    name: "Dashboard",
    icon: <DashboardIcon color="primary" sx={{ fontSize: "30px" }} />,
    element: <AdminDashboard />,
    path: "/admin",
  },
  {
    name: "User",
    icon: <PeopleIcon color="primary" sx={{ fontSize: "30px" }} />,
    element: <AdminUser />,
    path: "/admin/user",
  },
  {
    name: "Task",
    icon: <Assignment color="primary" sx={{ fontSize: "30px" }} />,
    element: <AdminTask />,
    path: "/admin/task",
  },
  {
    name: "Task Type",
    icon: <Assignment color="primary" sx={{ fontSize: "30px" }} />,
    element: <AdminTaskType />,
    path: "/admin/task_type",
  },
  // {
  //   // name: "Laporan Keuangan",
  //   // icon: <i className="bi bi-house"></i>,
  //   element: <AdminKeuangan />,
  //   path: "/admin/keuangan",
  // },
];
