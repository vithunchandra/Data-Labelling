import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Signup from "./pages/authentication/Signup";
import Admin from "./pages/admin/Admin";
import Requester from "./pages/requester/Requester";
import Worker from "./pages/worker/Worker";
import AddTaskType from "./pages/admin/AddTaskType";
import WorkerDashboard from "./pages/worker/WorkerDashboard";
import WorkerTask from "./pages/worker/WorkerTask";
import Marketplace, { marketplaceLoader } from "./pages/worker/Marketplace";
import MarketTaskDetail, { loader } from "./pages/worker/MarketTaskDetail";
import Task, { taskDetailLoader } from "./pages/worker/Task";
import TaskData, { taskDataLoader } from "./pages/worker/TaskData";
import RequesterDashboard from "./pages/requester/RequesterDashboard";
import CreateTask from "./pages/requester/CreateTask";
import AddTask from "./pages/requester/AddTask";
import EditTask, { taskEditLoader } from "./pages/requester/EditTask";
import TopUp from "./pages/requester/TopUp";
import MonitorTask from "./pages/requester/MonitorTask";
import TaskInformation from "./pages/worker/TaskInformation";
import Labelling, { labelllingLoader } from "./pages/worker/Labelling";
import MyWallet from "./pages/worker/MyWallet";
import DetailTask, { taskMonitorLoader } from "./pages/requester/DetailTask";
import Chat from "./pages/requester/Chat";
import ChatBox, { workerIDLoader } from "./components/requester/ChatBox";
import BanList from "./pages/requester/BanList";
import Signin from "./pages/authentication/Signin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUser from "./pages/admin/AdminUser";
import AdminTaskType from "./pages/admin/AdminTaskType";
import AdminKeuangan from "./pages/admin/AdminKeuangan";
import AdminTask from "./pages/admin/AdminTask";
import AdminUserDetail from "./pages/admin/AdminUserDetail";
import AdminTaskDetail from "./pages/admin/AdminTaskDetail";
import AdminUserTaskDetail from "./pages/admin/AdminUserTaskDetail";
import Authenticate from "./pages/authentication/Authenticate";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path="/signup" index={true} element={<Signup />}></Route>,
      <Route path="/signin" element={<Signin />}></Route>,
      <Route path="/admin" element={<Admin />}>
        <Route index element={<AdminDashboard />}></Route>
        <Route path="user" element={<AdminUser />}></Route>
        <Route path="user/:user_id" element={<AdminUserDetail />}></Route>
        <Route
          path="user/:user_id/detail/:task_id"
          element={<AdminUserTaskDetail />}
        ></Route>
        <Route path="task" element={<AdminTask />}></Route>
        <Route path="task/:task_id" element={<AdminTaskDetail />}></Route>
        <Route path="task_type" element={<AdminTaskType />}></Route>
        <Route
          path="/admin/task_type/add"
          element={<AddTaskType></AddTaskType>}
        ></Route>
        <Route path="keuangan" element={<AdminKeuangan />}></Route>
      </Route>,

      <Route path="worker" 
        element={
          <Authenticate role="worker">
            <Worker />
          </Authenticate>
        } 
      >
        <Route index element={
            <WorkerDashboard />
        }></Route>
        <Route path="marketplace" element={
            <Marketplace />
        } loader={marketplaceLoader}></Route>
        <Route
          path="marketplace/:task_id"
          element={<MarketTaskDetail />}
          loader={loader}
        ></Route>
        <Route path="task" element={
            <WorkerTask />
        }></Route>
        <Route
          path="task/:task_id"
          element={
              <Task />  
          }
          loader={taskDetailLoader as any}
        >
          <Route
            index
            element={<TaskInformation />}
            loader={taskDetailLoader as any}
          ></Route>
          <Route
            path="viewdata"
            element={<TaskData />}
            loader={taskDataLoader as any}
          ></Route>
          <Route
            path="viewdata/:data_id"
            loader={labelllingLoader as any}
            element={<Labelling />}
          ></Route>
        </Route>
        <Route path="wallet" element={<MyWallet />}></Route>
      </Route>,

      <Route path="requester" element={<Requester />}>
        <Route index element={<RequesterDashboard />}></Route>
        <Route path="create_task" element={<CreateTask />}></Route>
        <Route path="create_task/add" element={<AddTask />}></Route>
        <Route
          path="create_task/:task_id"
          element={<EditTask />}
          loader={taskEditLoader as any}
        ></Route>
        <Route path="monitor_task" element={<MonitorTask />}></Route>
        <Route
          path="monitor_task/:task_id"
          element={<DetailTask />}
          loader={taskMonitorLoader as any}
        ></Route>
        <Route
          path="monitor_task/:task_id/chat"
          element={<Chat />}
          loader={taskMonitorLoader as any}
        >
          <Route
            path=":worker"
            element={<ChatBox />}
            loader={workerIDLoader as any}
          ></Route>
        </Route>
        <Route path="ban_list" element={<BanList />}></Route>
        <Route path="top_up" element={<TopUp />}></Route>
      </Route>,
    ])
  );

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
