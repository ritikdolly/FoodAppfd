export const AdminDashboard = () => {
  const stats = [
    { title: "Total Orders", value: 128, color: "bg-blue-50 text-blue-600" },
    { title: "Food Items", value: 24, color: "bg-orange-50 text-orange-600" },
    { title: "Active Offers", value: 5, color: "bg-purple-50 text-purple-600" },
    { title: "Revenue", value: "₹45,200", color: "bg-green-50 text-green-600" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <p className="text-sm font-medium text-gray-500 mb-1">
              {item.title}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              <div className={`p-2 rounded-lg ${item.color}`}>
                <div className="w-4 h-4 rounded-full bg-current opacity-20" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for Recent Orders Chart or similar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-64 flex items-center justify-center text-gray-400">
          Revenue Chart Placeholder
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-64 flex items-center justify-center text-gray-400">
          Recent Activity Placeholder
        </div>
      </div>
    </div>
  );
};
