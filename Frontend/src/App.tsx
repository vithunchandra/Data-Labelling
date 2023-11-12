import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Signup from "./pages/Signup";
import Admin from "./pages/admin/Admin";
import Requester from "./pages/requester/Requester";
import Worker from "./pages/worker/Worker";
import { adminNavigation, requesterNavigation } from "./route";
import AddTaskType from "./pages/admin/AddTaskType";
import WorkerDashboard from "./pages/worker/WorkerDashboard";
import WorkerTask from "./pages/worker/WorkerTask";
import Marketplace from "./pages/worker/Marketplace";
import MarketTaskDetail, { loader } from "./pages/worker/MarketTaskDetail";
import TaskDetail, { taskDetailLoader } from "./pages/worker/TaskDetail";
import TaskData, { taskDataLoader } from "./pages/worker/TaskData";
import RequesterDashboard from "./pages/requester/RequesterDashboard";
import CreateTask from "./pages/requester/CreateTask";
import AddTask from "./pages/requester/AddTask";
import EditTask, { taskEditLoader } from "./pages/requester/EditTask";
import TopUp from "./pages/requester/TopUp";
import MonitorTask from "./pages/requester/MonitorTask";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path="/signup" index={true} element={<Signup />}></Route>,
      <Route path="/admin" element={<Admin />}>
        {adminNavigation.map((item, index) => {
          return (
            <Route
              key={index}
              index={index === 0 && true}
              path={item.path}
              element={item.element}
            ></Route>
          );
        })}
        <Route
          path="/admin/task_type/add_task"
          element={<AddTaskType></AddTaskType>}
        >

        </Route>
      </Route>,

      <Route path="worker" element={<Worker />}>
        <Route index element={<WorkerDashboard />}></Route>
        <Route path="marketplace" element={<Marketplace />}></Route>
        <Route path="marketplace/:task_id" element={<MarketTaskDetail />} loader={loader as any}></Route>
        <Route path="task" element={<WorkerTask />}></Route>
        <Route path="task/:task_id" element={<TaskDetail />} loader={taskDetailLoader as any}></Route>
        <Route path="task/:task_id/viewdata" element={<TaskData />} loader={taskDataLoader as any}></Route>
      </Route>,
      <Route path="requester" element={<Requester />}>
        <Route index element={<RequesterDashboard />}></Route>
        <Route path="create_task" element={<CreateTask />}></Route>
        <Route path="create_task/add" element={<AddTask />}></Route>
        <Route path="create_task/:task_id" element={<EditTask />} loader={taskEditLoader as any}></Route>
        <Route path="monitor_task" element={<MonitorTask />}></Route>
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
