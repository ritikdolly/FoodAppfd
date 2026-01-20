import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  Repeat,
  Truck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";

export const OrdersPage = () => {
  const navigate = useNavigate();
  // Mock orders data with more variety
  const orders = [
    {
      id: "ORD-12345",
      date: "Oct 24, 2023 • 12:30 PM",
      total: 450,
      status: "Delivered",
      items: [
        { name: "Spicy Chicken Pizza", qty: 1, price: 350 },
        { name: "Coke (500ml)", qty: 2, price: 50 },
      ],
      img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: "ORD-12346",
      date: "Today • 2:15 PM",
      total: 1200,
      status: "Processing",
      items: [
        { name: "Family Combo", qty: 1, price: 900 },
        { name: "Garlic Bread", qty: 2, price: 150 },
      ],
      img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: "ORD-12347",
      date: "Sep 15, 2023",
      total: 340,
      status: "Cancelled",
      items: [
        { name: "Veg Burger", qty: 1, price: 150 },
        { name: "Fries", qty: 1, price: 190 },
      ],
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=200&auto=format&fit=crop",
    },
  ];

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

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
            <p className="text-gray-500 mt-1">
              Check the status of recent orders, manage returns, and discover
              similar products.
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex gap-2">
            <Package className="w-4 h-4" /> Buy Again
          </Button>
        </div>

        <div className="flex flex-col gap-6">
          {orders.map((order) => {
            const style = getStatusStyles(order.status);

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
                        #{order.id.split("-")[1]}
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
                        src={order.img}
                        alt="Order"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/5" />
                    </div>

                    {/* Items */}
                    <div className="flex-1 space-y-3">
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#FF4B2B] transition-colors">
                        {order.items[0].name}{" "}
                        {order.items.length > 1 &&
                          `+ ${order.items.length - 1} more`}
                      </h3>
                      <div className="space-y-1">
                        {order.items.map((item, i) => (
                          <div
                            key={i}
                            className="flex justify-between text-sm text-gray-600 max-w-sm"
                          >
                            <span>
                              {item.qty}x {item.name}
                            </span>
                            <span className="font-medium">₹{item.price}</span>
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
                          onClick={() => navigate(`/product/1`)} // Demo reorder
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
                    ) : order.status === "Processing" ? (
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
