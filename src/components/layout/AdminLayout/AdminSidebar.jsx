import { NavLink } from "react-router-dom";
import { LayoutDashboard, Utensils, ShoppingBag, Tag } from "lucide-react";

export const AdminSidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium mb-1 ${
      isActive
        ? "bg-[#FF4B2B] text-white shadow-lg shadow-[#FF4B2B]/25"
        : "text-gray-400 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <aside className="w-64 bg-[#1a1c23] border-r border-gray-800 text-white flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#FF4B2B] to-[#FF416C]">
          Admin Panel
        </h1>
      </div>

      <nav className="flex-1 px-4 py-4">
        <NavLink to="/admin" end className={linkClass}>
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </NavLink>

        <NavLink to="/admin/food" className={linkClass}>
          <Utensils className="w-5 h-5" />
          Food Items
        </NavLink>

        <NavLink to="/admin/orders" className={linkClass}>
          <ShoppingBag className="w-5 h-5" />
          Orders
        </NavLink>

        <NavLink to="/admin/offers" className={linkClass}>
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
  );
};
