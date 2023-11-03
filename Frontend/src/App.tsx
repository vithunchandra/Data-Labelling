import './App.css'
import {createBrowserRouter, createRoutesFromElements, Route, Routes, RouterProvider} from 'react-router-dom'
import Signup from './pages/Signup'
import Admin from './pages/Admin'
import Requester from './pages/Requester'
import Worker from './pages/Worker'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      [
        <Route path='/signup' index={true} element={<Signup/>}></Route>,
        <Route path='/admin' element={<Admin/>}></Route>,
        <Route path='/requester' element={<Requester/>}></Route>,
        <Route path='/worker' element={<Worker/>}></Route>
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
