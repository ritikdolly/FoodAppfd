import { useEffect, useState } from "react";
import { fetchAdminOrders, updateAdminOrderStatus } from "../../../api/admin";
import { OrderStatusDropdown } from "./OrderStatusDropdown";
import { ChevronDown, ChevronUp } from "lucide-react";

export const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const loadOrders = async () => {
    try {
      const data = await fetchAdminOrders();
      // Ensure orders is an array, backend might return empty list or something else
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const updatedOrder = await updateAdminOrderStatus(id, newStatus);
      setOrders((prev) =>
        prev.map((o) =>
          o.id === id ? { ...o, status: updatedOrder.status } : o,
        ),
      );
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Orders</h2>

      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
          >
            <div
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() =>
                setExpandedOrderId(
                  expandedOrderId === order.id ? null : order.id,
                )
              }
            >
              <div>
                <p className="font-medium">
                  Order #{order.id} - {order.user?.name || "User"}
                </p>
                <p className="text-sm text-gray-500">
                  Total: ${order.total} • {order.items?.length || 0} Items
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div onClick={(e) => e.stopPropagation()}>
                  <OrderStatusDropdown
                    status={order.status}
                    onChange={(newStatus) =>
                      handleStatusUpdate(order.id, newStatus)
                    }
                  />
                </div>
                {expandedOrderId === order.id ? (
                  <ChevronUp size={20} className="text-gray-400" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
                )}
              </div>
            </div>

            {expandedOrderId === order.id && (
              <div className="bg-gray-50 p-4 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Order Items
                </h4>
                <div className="space-y-2">
                  {order.items?.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm bg-white p-2 rounded border border-gray-100"
                    >
                      <span className="font-medium text-gray-800">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="text-gray-600">${item.price}</span>
                    </div>
                  ))}
                  {/* Fallback if no items */}
                  {(!order.items || order.items.length === 0) && (
                    <p className="text-sm text-gray-500">
                      No items details available.
                    </p>
                  )}
                </div>

                {order.address && (
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">
                      Delivery Address
                    </h4>
                    <p className="text-sm text-gray-600">
                      {order.address.street}, {order.address.city},{" "}
                      {order.address.zipCode}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {orders.length === 0 && (
          <p className="text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};
