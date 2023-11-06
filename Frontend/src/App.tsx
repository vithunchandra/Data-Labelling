import './App.css'
import {createBrowserRouter, createRoutesFromElements, Route, Routes, RouterProvider} from 'react-router-dom'
import Signup from './pages/Signup'
import Admin from './pages/admin/Admin'
import Requester from './pages/requester/Requester'
import Worker from './pages/worker/Worker'
import { workerNavigation } from './route'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      [
        <Route path='/signup' index={true} element={<Signup/>}></Route>,
        <Route path='/admin' element={<Admin/>}></Route>,
        <Route path='/requester' element={<Requester/>}></Route>,
        <Route path='/worker' element={<Worker/>}>
          {
            workerNavigation.map((item, index) => {
              return <Route index={index === 0 && true} path={item.path} element={item.element}></Route>
            })
          }
        </Route>
      ]
    )
  )

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
