import {
  Heart,
  ShoppingCart,
  LogOut,
  User,
  Settings,
  ShoppingBag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { Avatar } from "../ui/Avatar";

export const DesktopActions = ({
  cartCount = 0,
  isLoggedIn = true,
  isAdmin = false,
  user = {},
  onLogin,
  onSignup,
  onLogout,
}) => {
  const navigate = useNavigate();

  return (
    <div className="hidden md:flex items-center gap-3 border-l pl-6">
      {/* Favorites */}
      <button
        onClick={() => navigate("/auth/customer/favorites")}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <Heart className="w-5 h-5" />
      </button>

      {/* Cart */}
      <button
        onClick={() => {
          if (isLoggedIn) {
            navigate("/auth/customer/cart");
          } else {
            onLogin();
          }
        }}
        className="relative p-2 hover:bg-orange-50 rounded-full"
      >
        <ShoppingCart className="w-5 h-5" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-1.5 rounded-full border-2 border-white">
            {cartCount}
          </span>
        )}
      </button>

      {/* AUTH SECTION */}
      {!isLoggedIn ? (
        /* NOT LOGGED IN */
        <div className="flex items-center gap-4">
          <Button onClick={onLogin} variant="ghost">
            Sign In
          </Button>

          <Button onClick={onSignup} variant="primary">
            Sign Up
          </Button>
        </div>
      ) : (
        /* LOGGED IN */
        <div className="relative group">
          {/* Avatar */}
          <div
            className="
              flex items-center gap-2 p-1.5 pr-3 rounded-full cursor-pointer
              bg-white shadow-[rgba(17,17,26,0.1)_0px_0px_16px]
              hover:bg-gray-50 transition
            "
          >
            <Avatar user={user} />
            <span className="hidden lg:block text-sm font-medium">
              {user.fullName || user.name || "User"}
            </span>
          </div>

          {/* Dropdown */}
          <div
            className="
              absolute right-0 top-full mt-2 w-48 bg-white border rounded-xl
              shadow-[rgba(17,17,26,0.1)_0px_0px_16px]
              opacity-0 invisible group-hover:opacity-100 group-hover:visible
              transition-all z-50
            "
          >
            <button
              onClick={() => navigate("/auth/customer/profile")}
              className="w-full px-4 py-3 flex items-center gap-3 text-sm hover:bg-gray-50 text-left"
            >
              <User className="w-4 h-4" />
              Profile
            </button>

            <button
              onClick={() => navigate("/auth/customer/orders")}
              className="w-full px-4 py-3 flex items-center gap-3 text-sm hover:bg-gray-50 text-left"
            >
              <ShoppingBag className="w-4 h-4" />
              My Orders
            </button>

            {isAdmin && (
              <button
                onClick={() => navigate("/auth/admin/dashboard")}
                className="w-full px-4 py-3 flex items-center gap-3 text-sm hover:bg-orange-50 text-orange-600 text-left font-medium"
              >
                <Settings className="w-4 h-4" />
                Admin Panel
              </button>
            )}

            <button
              onClick={() => navigate("/auth/customer/profile")}
              className="w-full px-4 py-3 flex items-center gap-3 text-sm hover:bg-gray-50 text-left"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>

            <button
              onClick={onLogout}
              className="w-full px-4 py-3 flex items-center gap-3 text-sm text-red-600 hover:bg-red-50 rounded-b-xl"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
