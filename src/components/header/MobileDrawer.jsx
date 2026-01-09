import { useEffect } from "react";
import { X, Heart, MapPin, User, LogOut } from "lucide-react";

export const MobileDrawer = ({
  open,
  onClose,
  links,
  isLoggedIn = false,
  onLogin,
  onLogout,
}) => {
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

          {/* Account */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex gap-3 px-4 py-2">
              <Heart /> Favorites
            </div>
            <div className="flex gap-3 px-4 py-2">
              <MapPin /> Addresses
            </div>

            {!isLoggedIn ? (
              <button
                onClick={onLogin}
                className="flex gap-3 px-4 py-2 text-orange-600 font-medium"
              >
                <User /> Sign In / Sign Up
              </button>
            ) : (
              <button
                onClick={onLogout}
                className="flex gap-3 px-4 py-2 text-red-600 font-medium"
              >
                <LogOut /> Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
