import { NavLink } from "react-router-dom";

export const AdminSidebar = () => {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded ${
      isActive
        ? "bg-orange-600 text-white"
        : "text-gray-300 hover:bg-gray-700"
    }`;

  return (
    <aside className="w-64 bg-gray-900 text-white p-4">
      <nav className="space-y-2">
        <NavLink to="/admin" end className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/food" className={linkClass}>
          Food Items
        </NavLink>

        <NavLink to="/admin/orders" className={linkClass}>
          Orders
        </NavLink>

        <NavLink to="/admin/offers" className={linkClass}>
          Offers
        </NavLink>
      </nav>
    </aside>
  );
};
