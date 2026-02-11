import { useEffect, useState } from "react";
import { getDashboardStats } from "../../../api/admin";
import { getAllCustomerReviews } from "../../../api/customerReview";

export const AdminDashboard = () => {
  const [data, setData] = useState({
    totalOrders: 0,
    foodItems: 0,
    activeOffers: 0,
    revenue: 0,
    revenueData: [],
    recentOrders: [],
  });

  const [customerReviews, setCustomerReviews] = useState([]);

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

    const fetchReviews = async () => {
      try {
        const reviews = await getAllCustomerReviews();
        setCustomerReviews(reviews);
      } catch (error) {
        console.error("Failed to fetch customer reviews", error);
      }
    };

    fetchStats();
    fetchReviews();
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Revenue Trends (Last 7 Days)
          </h3>
          <div className="h-64 w-full flex items-end justify-between gap-2">
            {data.revenueData && data.revenueData.length > 0 ? (
              data.revenueData.map((item, index) => {
                const maxVal = Math.max(
                  ...data.revenueData.map((d) => d.amount),
                  1,
                ); // Avoid div/0
                const height = (item.amount / maxVal) * 100;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center w-full group relative"
                  >
                    <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                      ₹{item.amount}
                    </div>
                    <div
                      className="w-full bg-[#FF4B2B]/20 rounded-t-sm hover:bg-[#FF4B2B]/40 transition-colors cursor-pointer"
                      style={{ height: `${height}%`, minHeight: "4px" }}
                    />
                    <span className="text-xs text-gray-500 mt-2">
                      {item.label}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No revenue data available
              </div>
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4 overflow-y-auto max-h-64 pr-2">
            {data.recentOrders && data.recentOrders.length > 0 ? (
              data.recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      Order #{order.id.substring(0, 6)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()} •{" "}
                      {order.items.length} Items
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      ₹{order.totalAmount}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "COMPLETED" ||
                        order.status === "DELIVERED"
                          ? "bg-green-100 text-green-700"
                          : order.status === "CANCELLED"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                No recent orders
              </div>
            )}
          </div>
        </div>
      </div>      
    </div>
  );
};
