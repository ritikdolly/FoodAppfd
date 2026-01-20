import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";
import { AdminFooter } from "./AdminFooter";

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* SIDEBAR */}
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 md:ml-64">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>

        <AdminFooter />
      </div>
    </div>
  );
};
