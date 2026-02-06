import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Heart, MapPin, User, LogOut, ShoppingBag } from "lucide-react";

export const MobileDrawer = ({
  open,
  onClose,
  links,
  isLoggedIn = false,
  isAdmin = false,
  user,
  onLogin,
  onLogout,
}) => {
  const navigate = useNavigate();

  // 🔒 Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] md:hidden transition-opacity
        ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white z-[70]
        transition-transform duration-300 md:hidden
        shadow-[rgba(17,17,26,0.1)_0px_0px_16px]
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="p-5 flex justify-between items-center border-b">
          <span className="font-bold text-lg">Menu</span>
          <button onClick={onClose} aria-label="Close menu">
            <X />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Navigation */}
          {links.map((l) => (
            <a
              key={l.name}
              href={l.href}
              onClick={onClose}
              className="block px-4 py-3 rounded-lg hover:bg-gray-50"
            >
              {l.name}
            </a>
          ))}

          {/* Admin Link */}
          {isAdmin && (
            <button
              onClick={() => {
                navigate("/auth/admin/dashboard");
                onClose();
              }}
              className="w-full text-left px-4 py-3 rounded-lg bg-orange-50 text-orange-600 font-medium hover:bg-orange-100 transition-colors"
            >
              Admin Panel
            </button>
          )}

          {/* Account Section */}
          <div className="border-t border-gray-100 pt-6 mt-2">
            {!isLoggedIn ? (
              <button
                onClick={onLogin}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#FF4B2B] text-white rounded-xl font-bold shadow-lg shadow-[#FF4B2B]/20"
              >
                <User className="w-5 h-5" /> Sign In / Sign Up
              </button>
            ) : (
              <div className="space-y-4">
                {/* User Info */}
                <div className="flex items-center gap-3 px-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg">
                    {user?.initials || "U"}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg text-left"
                  >
                    <User className="w-5 h-5 text-gray-400" /> My Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate("/orders");
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg text-left"
                  >
                    <ShoppingBag className="w-5 h-5 text-gray-400" /> My Orders
                  </button>
                  <button
                    onClick={() => {
                      navigate("/favorites");
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg text-left"
                  >
                    <Heart className="w-5 h-5 text-gray-400" /> Favorites
                  </button>
                  <button
                    onClick={() => {
                      navigate("/addresses");
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg text-left"
                  >
                    <MapPin className="w-5 h-5 text-gray-400" /> Saved Addresses
                  </button>
                </div>

                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg font-medium mt-2"
                >
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
