import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
  RouterProvider,
} from "react-router-dom";
import Signup from "./pages/Signup";
import Admin from "./pages/admin/Admin";
import Requester from "./pages/requester/Requester";
import Worker from "./pages/worker/Worker";
import { adminNavigation, requesterNavigation, workerNavigation } from "./route";
import AddTaskType from "./pages/admin/AddTaskType";

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
      <Route path="/requester" element={<Requester />}>
        {requesterNavigation.map((item, index) => {
          return (
            <Route
              key={index}
              index={index === 0 && true}
              path={item.path}
              element={item.element}
            ></Route>
          );
        })}
      </Route>,
      <Route path="/worker" element={<Worker />}>
        {workerNavigation.map((item, index) => {
          return (
            <Route
              key={index}
              index={index === 0 && true}
              path={item.path}
              element={item.element}
            ></Route>
          );
        })}
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
