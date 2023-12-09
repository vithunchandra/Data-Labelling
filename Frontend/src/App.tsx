import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import Signup from "./pages/authentication/Signup";
import Admin from "./pages/admin/Admin";
import Requester from "./pages/requester/Requester";
import Worker from "./pages/worker/Worker";
import AddTaskType, { addTasktype } from "./pages/admin/AddTaskType";
import WorkerDashboard, {
  workerDashboardLoader,
} from "./pages/worker/WorkerDashboard";
import WorkerTask, { workerTaskLoader } from "./pages/worker/WorkerTask";
import Marketplace, { marketplaceLoader } from "./pages/worker/Marketplace";
import MarketTaskDetail, {
  marketTaskDetailLoader,
} from "./pages/worker/MarketTaskDetail";
import Task, { taskDetailLoader } from "./pages/worker/Task";
import TaskData, { dataLoader } from "./pages/worker/TaskData";
import RequesterDashboard from "./pages/requester/RequesterDashboard";
import CreateTask, { getUserTasks } from "./pages/requester/CreateTask";
import AddTask, {
  AddTaskAction,
  getAllTaskType,
} from "./pages/requester/AddTask";
import EditTask, { editTaskAction, taskEditLoader } from "./pages/requester/EditTask";
import TopUp from "./pages/requester/TopUp";
import MonitorTask, { ToggleTaskAction } from "./pages/requester/MonitorTask";
import TaskInformation from "./pages/worker/TaskInformation";
import Labelling, { labellingLoader } from "./pages/worker/Labelling";
import MyWallet from "./pages/worker/MyWallet";
import DetailTask, { taskMonitorLoader } from "./pages/requester/DetailTask";
import Chat from "./pages/requester/Chat";
import ChatBox, { sendChat, workerIDLoader } from "./components/requester/ChatBox";
import BanList from "./pages/requester/BanList";
import Signin from "./pages/authentication/Signin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUser, { getUsers } from "./pages/admin/AdminUser";
import AdminTaskType, {
  getTaskTypes,
  editTasktype,
} from "./pages/admin/AdminTaskType";
import AdminKeuangan from "./pages/admin/AdminKeuangan";
import AdminTask, { getTasks } from "./pages/admin/AdminTask";
import AdminUserDetail, { getUserDetail } from "./pages/admin/AdminUserDetail";
import AdminTaskDetail from "./pages/admin/AdminTaskDetail";
import AdminUserTaskDetail from "./pages/admin/AdminUserTaskDetail";
import Authenticate from "./pages/authentication/Authenticate";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route index={true} element={<Navigate to={"signin"} />}></Route>,
      <Route path="/signup" element={<Signup />}></Route>,
      <Route path="/signin" element={<Signin />}></Route>,
      <Route
        path="/admin"
        element={
          <Authenticate role="admin">
            <Admin />
          </Authenticate>
        }
      >
        <Route index element={<AdminDashboard />}></Route>
        <Route path="user" element={<AdminUser />} loader={getUsers}></Route>
        <Route
          path="user/:user_id"
          element={<AdminUserDetail />}
          loader={getUserDetail}
        ></Route>
        <Route
          path="user/:user_id/detail/:task_id"
          element={<AdminUserTaskDetail />}
        ></Route>
        <Route path="task" element={<AdminTask />} loader={getTasks}></Route>
        <Route path="task/:task_id" element={<AdminTaskDetail />}></Route>
        <Route
          path="/admin/task_type"
          element={<AdminTaskType />}
          loader={getTaskTypes}
          action={editTasktype}
        ></Route>
        <Route
          path="/admin/task_type/add"
          element={<AddTaskType></AddTaskType>}
          action={addTasktype}
        ></Route>
        <Route path="keuangan" element={<AdminKeuangan />}></Route>
      </Route>,

      <Route
        path="worker"
        element={
          <Authenticate role="worker">
            <Worker />
          </Authenticate>
        }
      >
        <Route
          index
          element={<WorkerDashboard />}
          loader={workerDashboardLoader}
        ></Route>
        <Route
          path="marketplace"
          element={<Marketplace />}
          loader={marketplaceLoader}
        ></Route>
        <Route
          path="marketplace/:task_id"
          element={<MarketTaskDetail />}
          loader={marketTaskDetailLoader}
        ></Route>
        <Route
          path="task"
          element={<WorkerTask />}
          loader={workerTaskLoader}
        ></Route>
        <Route
          path="task/:task_id"
          element={<Task />}
          loader={taskDetailLoader}
        >
          <Route index element={<TaskInformation />}></Route>
          <Route
            path="viewdata"
            element={<TaskData />}
            loader={dataLoader}
          ></Route>
          <Route
            path="viewdata/:data_id"
            loader={labellingLoader}
            element={<Labelling />}
          ></Route>
        </Route>
        <Route path="wallet" element={<MyWallet />}></Route>
      </Route>,

      <Route
        path="requester"
        element={
          <Authenticate role="requester">
            <Requester />
          </Authenticate>
        }
      >
        <Route index element={<RequesterDashboard />}></Route>
        <Route
          path="create_task"
          element={<CreateTask />}
          loader={getUserTasks as any}
        ></Route>
        <Route
          path="create_task/add"
          element={<AddTask />}
          loader={getAllTaskType}
          action={AddTaskAction}
        ></Route>
        <Route
          path="create_task/:task_id"
          element={<EditTask />}
          loader={taskEditLoader as any}
          action={editTaskAction as any}
        ></Route>
        <Route
          path="monitor_task"
          element={<MonitorTask />}
          loader={getUserTasks as any}
          action={ToggleTaskAction}
        ></Route>
        <Route
          path="monitor_task/:task_id"
          element={<DetailTask />}
          loader={taskMonitorLoader as any}
          action={ToggleTaskAction}
        ></Route>
        <Route
          path="monitor_task/:task_id/chat"
          element={<Chat />}
          loader={taskMonitorLoader as any}
        >
          <Route
            index
            element={<div className="w-100 h-100 d-flex justify-content-center align-items-center"><img src="../public/Logo_2.png" className="w-50" /></div>}
          ></Route>
          <Route
            path=":worker"
            element={<ChatBox />}
            loader={workerIDLoader as any} 
            action={sendChat}
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
