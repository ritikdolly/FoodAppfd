import { NavLink } from "react-router-dom";
import { LayoutDashboard, Utensils, ShoppingBag, Tag, X } from "lucide-react";

export const AdminSidebar = ({ open, onClose }) => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium mb-1 ${
      isActive
        ? "bg-[#FF4B2B] text-white shadow-lg shadow-[#FF4B2B]/25"
        : "text-gray-400 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 bottom-0 w-64 bg-[#1a1c23] border-r border-gray-800 text-white flex flex-col z-50
          transition-transform duration-300 ease-in-out
          md:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#FF4B2B] to-[#FF416C]">
            Admin Panel
          </h1>
          {/* Close Button (Mobile Only) */}
          <button
            onClick={onClose}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4">
          <NavLink
            to="/admin"
            end
            className={linkClass}
            onClick={() => onClose()}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/food"
            className={linkClass}
            onClick={() => onClose()}
          >
            <Utensils className="w-5 h-5" />
            Food Items
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={linkClass}
            onClick={() => onClose()}
          >
            <ShoppingBag className="w-5 h-5" />
            Orders
          </NavLink>

          <NavLink
            to="/admin/offers"
            className={linkClass}
            onClick={() => onClose()}
          >
            <Tag className="w-5 h-5" />
            Offers
          </NavLink>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#FF4B2B] to-[#FF416C] flex items-center justify-center font-bold">
              A
            </div>
            <div className="text-sm">
              <p className="font-medium">Admin User</p>
              <p className="text-xs text-gray-500">admin@plh.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
