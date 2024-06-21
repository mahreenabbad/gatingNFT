import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Wallet from "./pages/Wallet";
import Home from "./pages/Home";
import Members from "./pages/Members";

import './App.css'

function App() {
  const router = createBrowserRouter([
    {path:'/',element:<Wallet/>},
    {path:'/home',element:<Home/>},
    {path:'/members',element:<Members/>},
  ])
  

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
