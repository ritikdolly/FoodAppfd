import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Layout } from './Layout/Layout'
import { DashBoard } from './components/admin/dashboard/DashBoard'
import { Home } from './components/user/home/Home'
import { ProductPage } from '../src/pages/ProductPage'

const router=createBrowserRouter([
  {path:'/',element:<Layout/>,
    children:[
      // {index:true,element:<DashBoard/>},
      {index:true,element:<Home/>},
      {path:'/product/:id',element:<ProductPage/>}
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
