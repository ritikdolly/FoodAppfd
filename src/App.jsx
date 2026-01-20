import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { MainLayout } from "./components/layout/MainLayout/MainLayout";
import { Home } from "./pages/Home/Home";
import { ProductPage } from "./pages/ProductPage";
import { CartPage } from "./pages/Cart/CartPage";
import { CartProvider } from "./context/CartContext";
import { CheckoutPage } from "./pages/Checkout/CheckoutPage";
import { OrderList } from "./pages/Admin/Orders/OrderList";
import { OffersPage } from "./pages/Admin/Offers/OffersPage";
import { FoodPage } from "./pages/Admin/Food/FoodPage";
import { AdminLayout } from "./components/layout/AdminLayout/AdminLayout";
import { AdminDashboard } from "./pages/Admin/Dashboard/AdminDashboard";

const router = createBrowserRouter([
  // for user layout
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/product/:id", element: <ProductPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/placeOrder", element: <CheckoutPage /> },
    ],
  },

  //  for admin layout
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "orders", element: <OrderList /> },
      { path: "food", element: <FoodPage /> },
      { path: "offers", element: <OffersPage /> },
    ],
  },
]);

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
  );
}

export default App;
