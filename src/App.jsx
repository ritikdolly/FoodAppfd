import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Layout } from './Layout/Layout'
import { Home } from '../src/common/home/Home'
import { ProductPage } from '../src/pages/ProductPage'
import { AddCart } from './pages/AddCart'
import { CartProvider } from './context/CartContext'
import { PlaceOrder } from './pages/PlaceOrder'
import { OrderList } from './components/admin/Orders/OrderList'
import { OffersPage } from './components/admin/offers/OffersPage'
import { FoodPage } from './components/admin/food/FoodPage'
import { AdminLayout } from './components/admin/layout/AdminLayout'

const router=createBrowserRouter([

  // for user layout
  {path:'/',element:<Layout/>,
    children:[
      // {index:true,element:<DashBoard/>},
      {index:true,element:<Home/>},
      // {index:true,element:<PlaceOrder/>},
      {path:'/product/:id',element:<ProductPage/>},
      {path:'/cart',element: <AddCart/>},
      {path:'/placeOrder',element: <PlaceOrder/>}
      
    ],
  },

  //  for admin layout
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <h1>Admin Dashboard</h1> },
      { path: "orders", element: <OrderList/>},
      { path: "food", element: <FoodPage/>},
      { path: "offers", element: <OffersPage/> },
    ],
  },
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
