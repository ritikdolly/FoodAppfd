import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Layout } from './Layout/Layout'
import { DashBoard } from './components/admin/DashBoard'

const router=createBrowserRouter([
  {path:'/',element:<Layout/>,
    children:[
      {index:true,element:<DashBoard/>}
    ]
  }
])

function App() {
  return (
    <>
    <RouterProvider router={router} />
    {/* <Layout/> */}
    {/* <H1>Ritik Kumar</H1> */}
    </>
  )
}

export default App
