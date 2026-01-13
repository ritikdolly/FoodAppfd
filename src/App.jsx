import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Layout } from './Layout/Layout'
import { Home } from '../src/common/home/Home'
import { ProductPage } from '../src/pages/ProductPage'
import { AddCart } from './pages/AddCart'
import { CartProvider } from './context/CartContext'
import { PlaceOrder } from './pages/PlaceOrder'

const router=createBrowserRouter([
  {path:'/',element:<Layout/>,
    children:[
      // {index:true,element:<DashBoard/>},
      {index:true,element:<Home/>},
      // {index:true,element:<PlaceOrder/>},
      {path:'/product/:id',element:<ProductPage/>},
      {path:'/cart',element: <AddCart/>},
      {path:'/placeOrder',element: <PlaceOrder/>}
      
    ]
  }
])

function App() {
  return (
    <>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
    {/* <RouterProvider router={router} /> */}
    {/* <Layout/> */}
    {/* <H1>Ritik Kumar</H1> */}
    </>
  )
}

export default App
