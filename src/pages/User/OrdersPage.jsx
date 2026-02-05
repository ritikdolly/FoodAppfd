import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Repeat,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { getUserOrders } from "../../api/orders";
import { useAuth } from "../../context/AuthContext";
import { Loading } from "../../common/Loading";
import toast from "react-hot-toast";

export const OrdersPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (currentUser?.id) {
        try {
          const data = await getUserOrders(currentUser.id);
          // Sort by date descending (assuming date string or comparable ID)
          // For simple strings, we might just reverse or trust backend order.
          // Let's reverse to show newest first if backend sends oldest first.
          setOrders(data.reverse());
        } catch (error) {
          console.error("Failed to fetch orders", error);
          toast.error("Failed to load orders");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, [currentUser]);

  const getStatusStyles = (status) => {
    switch (status) {
      case "Delivered":
        return {
          bg: "bg-green-50",
          text: "text-green-700",
          border: "border-green-200",
          icon: <CheckCircle className="w-4 h-4" />,
        };
      case "Processing":
      case "PENDING": // Handling backend default if varying
        return {
          bg: "bg-blue-50",
          text: "text-blue-700",
          border: "border-blue-200",
          icon: <Clock className="w-4 h-4 animate-pulse" />,
        };
      case "Cancelled":
        return {
          bg: "bg-red-50",
          text: "text-red-700",
          border: "border-red-200",
          icon: <XCircle className="w-4 h-4" />,
        };
      default:
        return {
          bg: "bg-gray-50",
          text: "text-gray-700",
          border: "border-gray-200",
          icon: <Package className="w-4 h-4" />,
        };
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 flex flex-col items-center justify-center">
        <Package className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven't placed any orders yet.
        </p>
        <Button onClick={() => navigate("/")}>Start Shopping</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
            <p className="text-gray-500 mt-1">
              Check the status of recent orders.
            </p>
          </div>
          <Button
            variant="outline"
            className="hidden md:flex gap-2"
            onClick={() => navigate("/")}
          >
            <Package className="w-4 h-4" /> Browse Menu
          </Button>
        </div>

        <div className="flex flex-col gap-6">
          {orders.map((order) => {
            const style = getStatusStyles(order.status);
            // Fallback image if not present
            const displayImage =
              order.img ||
              (order.items && order.items.length > 0 && order.items[0].img) ||
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=200&auto=format&fit=crop";

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                {/* Header */}
                <div className="p-6 border-b border-gray-50 bg-gray-50/30 flex flex-wrap gap-4 justify-between items-center">
                  <div className="flex gap-6 text-sm">
                    <div>
                      <p className="font-medium text-gray-500 mb-0.5">
                        Order Placed
                      </p>
                      <p className="font-semibold text-gray-900">
                        {order.date}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-500 mb-0.5">
                        Total Amount
                      </p>
                      <p className="font-bold text-gray-900">₹{order.total}</p>
                    </div>
                    <div className="hidden sm:block">
                      <p className="font-medium text-gray-500 mb-0.5">
                        Order ID
                      </p>
                      <p className="font-mono text-gray-900">
                        #{order.id.slice(-6).toUpperCase()}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${style.bg} ${style.border} ${style.text} text-sm font-semibold`}
                  >
                    {style.icon}
                    {order.status}
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 grid md:grid-cols-[1fr,auto] gap-6 items-center">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Image */}
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                      <img
                        src={displayImage}
                        alt="Order"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=200&auto=format&fit=crop"; // Fallback
                        }}
                      />
                      <div className="absolute inset-0 bg-black/5" />
                    </div>

                    {/* Items */}
                    <div className="flex-1 space-y-3">
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#FF4B2B] transition-colors">
                        {order.items && order.items.length > 0
                          ? order.items[0].food?.name ||
                            order.items[0].name ||
                            "Food Items"
                          : "Order Items"}
                        {order.items &&
                          order.items.length > 1 &&
                          ` + ${order.items.length - 1} more`}
                      </h3>
                      <div className="space-y-1">
                        {order.items &&
                          order.items.map((item, i) => (
                            <div
                              key={i}
                              className="flex justify-between text-sm text-gray-600 max-w-sm"
                            >
                              <span>
                                {item.quantity || item.qty}x{" "}
                                {item.food?.name || item.name}
                              </span>
                              <span className="font-medium">
                                ₹{item.totalPrice || item.price}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-48 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-gray-100 md:pl-6">
                    {order.status === "Delivered" ? (
                      <>
                        <Button
                          onClick={() => navigate(`/product/1`)} // Demo reorder - logic might need update per item
                          className="w-full flex justify-center gap-2"
                          variant="primary"
                        >
                          <Repeat className="w-4 h-4" /> Reorder
                        </Button>
                        <Button
                          onClick={() => navigate(`/invoice/${order.id}`)}
                          variant="outline"
                          className="w-full flex justify-center gap-2 hover:bg-gray-50"
                        >
                          View Invoice
                        </Button>
                      </>
                    ) : order.status === "Processing" ||
                      order.status === "PENDING" ? (
                      <Button
                        onClick={() => navigate(`/order-tracking/${order.id}`)}
                        className="w-full flex justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white border-none"
                      >
                        <Truck className="w-4 h-4" /> Track Order
                      </Button>
                    ) : (
                      <Button
                        onClick={() => navigate("/help")}
                        variant="ghost"
                        className="w-full flex justify-center gap-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Help & Support
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
