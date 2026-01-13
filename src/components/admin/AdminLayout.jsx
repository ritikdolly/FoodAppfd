export const AdminLayout = ({ children }) => (
  <div className="flex min-h-screen">
    <aside className="w-64 bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="space-y-3">
        <p>Dashboard</p>
        <p>Food</p>
        <p>Orders</p>
        <p>Offers</p>
      </nav>
    </aside>

    <main className="flex-1 bg-gray-50 p-6">{children}</main>
  </div>
);
