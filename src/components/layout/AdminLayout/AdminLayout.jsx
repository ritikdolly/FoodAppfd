import { Outlet } from "react-router-dom";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";
import { AdminFooter } from "./AdminFooter";

export const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* SIDEBAR - Fixed height or sticky if needed, but here flex row works well */}
      <AdminSidebar />

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />

        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>

        <AdminFooter />
      </div>
    </div>
  );
};
