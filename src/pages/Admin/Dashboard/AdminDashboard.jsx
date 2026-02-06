import { useEffect, useState } from "react";
import { getDashboardStats } from "../../../api/admin";

export const AdminDashboard = () => {
  const [data, setData] = useState({
    totalOrders: 0,
    foodItems: 0,
    activeOffers: 0,
    revenue: 0,
  });

  const [period, setPeriod] = useState("all");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await getDashboardStats(period);
        setData(stats);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };
    fetchStats();
  }, [period]);

  const stats = [
    {
      title: "Total Orders",
      value: data.totalOrders,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Food Items",
      value: data.foodItems,
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "Active Offers",
      value: data.activeOffers,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Revenue",
      value: `₹${data.revenue.toLocaleString()}`,
      color: "bg-green-50 text-green-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-[#FF4B2B]/50 w-full sm:w-auto"
        >
          <option value="all">All Time</option>
          <option value="daily">Today</option>
          <option value="weekly">This Week</option>
          <option value="monthly">This Month</option>
          <option value="yearly">This Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
