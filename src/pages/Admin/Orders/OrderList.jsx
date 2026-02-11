import { useState, useEffect } from "react";
import { getAllOrders, updateOrderStatus } from "../../../api/orders";
import { format } from "date-fns";
import {
  ChevronDown,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
} from "lucide-react";
import toast from "react-hot-toast";
import { OrderDetailsModal } from "../../../components/admin/OrderDetailsModal";

export const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const STATUS_COLORS = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PAYMENT_PENDING: "bg-orange-100 text-orange-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    PREPARING: "bg-purple-100 text-purple-800",
    OUT_FOR_DELIVERY: "bg-indigo-100 text-indigo-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    let res = orders;
    if (statusFilter !== "ALL") {
      res = res.filter((o) => o.status === statusFilter);
    }
    if (searchQuery) {
      res = res.filter(
        (o) =>
          o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          o.userName.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    setFilteredOrders(res);
  }, [orders, statusFilter, searchQuery]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getAllOrders();
      // Sort by newest first
      const sorted = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      setOrders(sorted);
      setFilteredOrders(sorted);
    } catch {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, newStatus);
      setOrders(orders.map((o) => (o.id === orderId ? updatedOrder : o)));

      // Also update selected order if open
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(updatedOrder);
      }

      toast.success(`Order status updated to ${newStatus}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">Loading orders...</div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search Order ID or Customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FF4B2B]"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-[#FF4B2B]"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="PREPARING">Preparing</option>
            <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-600">
                  Order ID
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600">
                  Customer
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600">Date</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Items</th>
                <th className="px-6 py-4 font-semibold text-gray-600">
                  Amount
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-mono text-gray-500">
                    #{order.id.substring(0, 8)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {order.userName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {order.shippingAddress?.mobile}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {order.createdAt
                      ? format(new Date(order.createdAt), "MMM d, h:mm a")
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {order.totalItem} Items
                    <div className="text-xs text-gray-400 truncate w-32">
                      {order.items?.map((i) => i.foodName).join(", ")}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    ₹{order.totalAmount}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[order.status] || "bg-gray-100 text-gray-800"}`}
                    >
                      {order.status}
                    </span>
                    <div className="text-xs text-gray-400 mt-1">
                      {order.paymentDetails?.paymentMethod}
                    </div>
                  </td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <div className="relative group">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusUpdate(order.id, e.target.value)
                        }
                        className="px-2 py-1 text-xs border rounded focus:outline-none focus:border-[#FF4B2B] bg-white cursor-pointer w-28"
                        disabled={
                          order.status === "DELIVERED" ||
                          order.status === "CANCELLED"
                        }
                      >
                        <option value="PENDING">Pending</option>
                        <option value="CONFIRMED">Confirm</option>
                        <option value="PREPARING">Preparing</option>
                        <option value="OUT_FOR_DELIVERY">
                          Out for Delivery
                        </option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancel</option>
                      </select>
                    </div>

                    <button
                      onClick={() => handleViewDetails(order)}
                      className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-[#FF4B2B]"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setIsModalOpen(false)}
          onUpdateStatus={handleStatusUpdate}
        />
      )}
    </div>
  );
};
