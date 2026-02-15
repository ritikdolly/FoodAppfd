import { useState, useEffect } from "react";
import { getUserOrders } from "../../api/orders";
import { format } from "date-fns";
import { Package, ChevronRight, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getUserOrders();
      // Sort newest first
      setOrders(
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      );
    } catch (error) {
      toast.error("Failed to load your orders");
    } finally {
      setLoading(false);
    }
  };

  const STATUS_COLORS = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PAYMENT_PENDING: "bg-orange-100 text-orange-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    PREPARING: "bg-purple-100 text-purple-800",
    OUT_FOR_DELIVERY: "bg-indigo-100 text-indigo-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF4B2B]"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <ShoppingBag className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">No Orders Yet</h2>
        <p className="text-gray-500 mt-2">
          Looks like you haven't placed any orders yet.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">
                      Order #{order.id.substring(0, 8)}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLORS[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {order.createdAt
                      ? format(
                          new Date(order.createdAt),
                          "MMM d, yyyy 'at' h:mm a",
                        )
                      : ""}
                  </p>
                </div>
                <div className="font-bold text-lg text-gray-900">
                  ₹{order.totalAmount}
                </div>
              </div>

              <div className="space-y-3">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.foodImage}
                        alt={item.foodName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {item.foodName}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                    <div className="font-medium text-gray-900">
                      ₹{item.totalPrice}
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Man Information */}
              {(order.status === "OUT_FOR_DELIVERY" ||
                order.status === "DELIVERED") &&
                order.deliveryManName && (
                  <div className="border-t border-gray-100 mt-4 pt-4">
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        Delivery Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-blue-700 font-medium">
                            Delivery Person
                          </p>
                          <p className="text-sm font-semibold text-blue-900">
                            {order.deliveryManName}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-blue-700 font-medium">
                            Contact Number
                          </p>
                          <p className="text-sm font-semibold text-blue-900">
                            {order.deliveryManMobile}
                          </p>
                        </div>
                      </div>
                      {order.status === "DELIVERED" && order.deliveredAt && (
                        <p className="text-xs text-green-700 font-medium mt-3">
                          ✓ Delivered on{" "}
                          {format(
                            new Date(order.deliveredAt),
                            "MMM d, yyyy 'at' h:mm a",
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                )}

              <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                  {order.items?.length} items
                </div>
                {/* <button className="text-[#FF4B2B] font-medium hover:underline flex items-center gap-1">
                      View Details <ChevronRight className="w-4 h-4" />
                   </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
