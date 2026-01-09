import {
  Heart,
  ShoppingCart,
  LogOut,
  User,
  Settings,
} from "lucide-react";

export const DesktopActions = ({
  cartCount = 0,
  isLoggedIn = false,
  user = null,
  onLogin,
  onSignup,
  onLogout,
}) => {
  return (
    <div className="hidden md:flex items-center gap-3 border-l pl-6">
      {/* Favorites */}
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <Heart className="w-5 h-5" />
      </button>

      {/* Cart */}
      <button className="relative p-2 hover:bg-orange-50 rounded-full">
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
        <div className="flex items-center gap-2">
          <button
            onClick={onLogin}
            className="px-4 py-1.5 text-sm font-medium text-gray-700 hover:text-orange-600"
          >
            Sign In
          </button>
          <button
            onClick={onSignup}
            className="px-4 py-1.5 text-sm font-medium bg-orange-600 text-white rounded-full hover:bg-orange-700"
          >
            Sign Up
          </button>
        </div>
      ) : (
        /* LOGGED IN */
        <div className="relative group">
          {/* Avatar with shadow */}
          <div
            className="
              flex items-center gap-2 p-1.5 pr-3 rounded-full cursor-pointer
              bg-white
              shadow-[rgba(17,17,26,0.1)_0px_0px_16px]
              hover:bg-gray-50
              transition
            "
          >
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600">
              {user?.initials || "RK"}
            </div>
            <span className="hidden lg:block text-sm font-medium">
              {user?.name || "My Account"}
            </span>
          </div>

          {/* DROPDOWN */}
          <div
            className="
              absolute right-0 top-full mt-2 w-48 bg-white border rounded-xl
              shadow-[rgba(17,17,26,0.1)_0px_0px_16px]
              opacity-0 invisible
              group-hover:opacity-100 group-hover:visible
              transition-all
            "
          >
            <button className="w-full px-4 py-3 flex items-center gap-3 text-sm hover:bg-gray-50">
              <User className="w-4 h-4" />
              Profile
            </button>

            <button className="w-full px-4 py-3 flex items-center gap-3 text-sm hover:bg-gray-50">
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
