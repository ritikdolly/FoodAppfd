import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { MainLayout } from "./components/layout/MainLayout/MainLayout";
import { Home } from "./pages/Home/Home";
import { ProductPage } from "./pages/ProductPage";
import { CartPage } from "./pages/Cart/CartPage";
import { CartProvider } from "./context/CartContext";
import { CheckoutPage } from "./pages/Checkout/CheckoutPage";
import { ReviewList } from "./pages/Admin/Reviews/ReviewList";
import { OrderList } from "./pages/Admin/Orders/OrderList";
import { OffersPage } from "./pages/Admin/Offers/OffersPage";
import { FoodPage } from "./pages/Admin/Food/FoodPage";
import { AdminLayout } from "./components/layout/AdminLayout/AdminLayout";
import { AdminDashboard } from "./pages/Admin/Dashboard/AdminDashboard";
import { ProfilePage } from "./pages/User/ProfilePage";
import { FavoritesPage } from "./pages/User/FavoritesPage";
import { AddressPage } from "./pages/User/AddressPage";
import { OrdersPage } from "./pages/User/OrdersPage";
import { OrderTrackingPage } from "./pages/User/OrderTrackingPage";
import { InvoicePage } from "./pages/User/InvoicePage";
import { HelpPage } from "./pages/User/HelpPage";

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
      { path: "/profile", element: <ProfilePage /> },
      { path: "/favorites", element: <FavoritesPage /> },
      { path: "/addresses", element: <AddressPage /> },
      { path: "/orders", element: <OrdersPage /> },
      { path: "/order-tracking/:id", element: <OrderTrackingPage /> },
      { path: "/invoice/:id", element: <InvoicePage /> },
      { path: "/help", element: <HelpPage /> },
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
      { path: "reviews", element: <ReviewList /> },
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
