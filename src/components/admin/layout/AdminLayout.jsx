import { Outlet } from "react-router-dom";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";
import { AdminFooter } from "./AdminFooter";

export const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <AdminHeader />

      <div className="flex flex-1">
        {/* SIDEBAR */}
        <AdminSidebar />

        {/* MAIN CONTENT */}
        <main className="flex-1 bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>

      {/* FOOTER */}
      <AdminFooter />
    </div>
  );
};
