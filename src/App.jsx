import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { MainLayout } from "./components/layout/MainLayout/MainLayout";
import { Home } from "./pages/Home/Home";
import { MenuPage } from "./pages/Menu/MenuPage";
import { ProductPage } from "./pages/ProductPage";
import { CartPage } from "./pages/Cart/CartPage";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { CheckoutPage } from "./pages/Checkout/CheckoutPage";
import { ReviewList } from "./pages/Admin/Reviews/ReviewList";
import { OrderList } from "./pages/Admin/Orders/OrderList";
import { OffersPage } from "./pages/Admin/Offers/OffersPage";
import { FoodPage } from "./pages/Admin/Food/FoodPage";
import { DeliveryMenManagement } from "./pages/Admin/DeliveryMenManagement";
import { OrderAssignment } from "./pages/Admin/OrderAssignment";
import { AdminLayout } from "./components/layout/AdminLayout/AdminLayout";
import { AdminDashboard } from "./pages/Admin/Dashboard/AdminDashboard";
import { Invoice } from "./components/admin/Invoice";
import { ProfilePage } from "./pages/User/ProfilePage";
import { FavoritesPage } from "./pages/User/FavoritesPage";
import { AddressPage } from "./pages/User/AddressPage";
import { OrdersPage } from "./pages/User/OrdersPage";
import { HelpPage } from "./pages/User/HelpPage";
import PrivateRoute from "./components/auth/PrivateRoute";

const router = createBrowserRouter([
  // { path: "/login", element: <SignInModal /> },
  // { path: "/signup", element: <SignUpModal /> },
  // for user layout
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/menu", element: <MenuPage /> },
      { path: "/product/:id", element: <ProductPage /> },
      { path: "/help", element: <HelpPage /> },
    ],
  },
  {
    path: "/checkout",
    element: <PrivateRoute allowedRoles={["ROLE_CUSTOMER"]} />,
    children: [
      {
        element: <MainLayout />,
        children: [{ index: true, element: <CheckoutPage /> }],
      },
    ],
  },
  {
    path: "/auth",
    children: [
      {
        path: "customer",
        element: <PrivateRoute allowedRoles={["ROLE_CUSTOMER"]} />,
        children: [
          {
            element: <MainLayout />,
            children: [
              { path: "cart", element: <CartPage /> },
              { path: "profile", element: <ProfilePage /> },
              { path: "favorites", element: <FavoritesPage /> },
              { path: "addresses", element: <AddressPage /> },
              { path: "orders", element: <OrdersPage /> },
            ],
          },
        ],
      },

      //  for admin layout
      {
        path: "admin",
        element: <PrivateRoute allowedRoles={["ROLE_ADMIN"]} />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              { index: true, element: <AdminDashboard /> },
              { path: "orders", element: <OrderList /> },
              { path: "orders/invoice/:id", element: <Invoice /> },
              { path: "food", element: <FoodPage /> },
              { path: "offers", element: <OffersPage /> },
              { path: "reviews", element: <ReviewList /> },
              { path: "delivery-men", element: <DeliveryMenManagement /> },
              { path: "order-assignment", element: <OrderAssignment /> },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
