import { useState, useEffect } from "react";
import { getAllOrders, assignDeliveryMan } from "../../api/orders";
import { getAvailableDeliveryMen } from "../../api/deliveryMan";
import toast from "react-hot-toast";
import { Package, User, MapPin, Clock } from "lucide-react";

export const OrderAssignment = () => {
  const [orders, setOrders] = useState([]);
  const [availableDeliveryMen, setAvailableDeliveryMen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ordersData, deliveryMenData] = await Promise.all([
        getAllOrders(),
        getAvailableDeliveryMen(),
      ]);

      // Filter orders that are pending or confirmed and not yet assigned
      const unassignedOrders = ordersData.filter(
        (order) =>
          (order.status === "PENDING" ||
            order.status === "CONFIRMED" ||
            order.status === "PREPARING") &&
          !order.deliveryManId,
      );

      setOrders(unassignedOrders);
      setAvailableDeliveryMen(deliveryMenData);
    } catch (error) {
      console.error("Failed to fetch data", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (orderId, deliveryManId) => {
    if (!deliveryManId) {
      toast.error("Please select a delivery person");
      return;
    }

    try {
      setAssigning(orderId);
      await assignDeliveryMan(orderId, deliveryManId);
      toast.success("Delivery person assigned successfully");
      fetchData(); // Refresh data
    } catch (error) {
      console.error("Failed to assign delivery man", error);
      toast.error(
        error.response?.data?.message || "Failed to assign delivery person",
      );
    } finally {
      setAssigning(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Order Assignment</h1>
        <p className="text-gray-600 mt-1">
          Assign delivery personnel to pending orders
        </p>
      </div>

      {availableDeliveryMen.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-6">
          <p className="font-medium">No delivery personnel available</p>
          <p className="text-sm">
            Add delivery personnel or set existing ones as available to assign
            orders.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Pending Orders
            </h3>
            <p className="text-gray-500">
              All orders are either assigned or completed.
            </p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Order Details */}
                <div className="lg:col-span-2">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{order.id?.slice(-8).toUpperCase()}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {formatDate(order.createdAt)}
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <User className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {order.userName}
                        </p>
                        <p className="text-sm text-gray-600">Customer</p>
                      </div>
                    </div>

                    {order.shippingAddress && (
                      <div className="flex items-start gap-2">
                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div className="text-sm text-gray-600">
                          <p>{order.shippingAddress.streetAddress}</p>
                          <p>
                            {order.shippingAddress.city},{" "}
                            {order.shippingAddress.state} -{" "}
                            {order.shippingAddress.pinCode}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-2">
                      <Package className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {order.totalItem} items - ₹
                          {order.totalAmount?.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">
                          Payment:{" "}
                          {order.paymentDetails?.paymentMethod || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Assignment Section */}
                <div className="flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-gray-200 pt-4 lg:pt-0 lg:pl-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assign Delivery Person
                    </label>
                    <select
                      id={`delivery-${order.id}`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-3"
                      disabled={
                        availableDeliveryMen.length === 0 ||
                        assigning === order.id
                      }
                    >
                      <option value="">Select delivery person</option>
                      {availableDeliveryMen.map((person) => (
                        <option key={person.id} value={person.id}>
                          {person.name} - {person.vehicleType}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      const select = document.getElementById(
                        `delivery-${order.id}`,
                      );
                      handleAssign(order.id, select.value);
                    }}
                    disabled={
                      availableDeliveryMen.length === 0 ||
                      assigning === order.id
                    }
                    className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {assigning === order.id ? "Assigning..." : "Assign Order"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
