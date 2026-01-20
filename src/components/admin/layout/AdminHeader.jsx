export const AdminHeader = () => {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold text-gray-800">
        Admin Panel
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Welcome, Admin
        </span>

        <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">
          Logout
        </button>
      </div>
    </header>
  );
};
