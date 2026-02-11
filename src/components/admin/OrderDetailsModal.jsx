import {
  X,
  MapPin,
  Phone,
  Mail,
  User,
  CreditCard,
  Calendar,
  Package,
  Printer,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";

export const OrderDetailsModal = ({ order, onClose, onUpdateStatus }) => {
  if (!order) return null;
  const navigate = useNavigate();

  const STATUS_COLORS = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PAYMENT_PENDING: "bg-orange-100 text-orange-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    PREPARING: "bg-purple-100 text-purple-800",
    OUT_FOR_DELIVERY: "bg-indigo-100 text-indigo-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="border-b pb-4">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-800">
                Order #{order.id.substring(0, 8)}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[order.status]}`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-gray-500 flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4" />
              Placed on{" "}
              {format(new Date(order.createdAt), "MMMM d, yyyy 'at' h:mm a")}
            </p>
          </div>

          {/* Customer & Delivery Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <User className="w-4 h-4 text-[#FF4B2B]" /> Customer Details
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                <p className="font-medium text-gray-900">{order.userName}</p>
                {/* Assuming user email is not directly on order but on user object, 
                    but order usually has shipping details or snapshot. 
                    If not present, we skip e.g. email if logic doesn't carry it. 
                    Based on Order entity: userId, userName, shippingAddress. 
                    We'll show what we have. */}
                {/* <p className="text-gray-600 flex items-center gap-2">
                  <Mail className="w-3 h-3" /> {order.userEmail}
                </p> */}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FF4B2B]" /> Delivery Address
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm text-gray-600">
                <p>{order.shippingAddress?.street}</p>
                <p>
                  {order.shippingAddress?.city}, {order.shippingAddress?.state}{" "}
                  - {order.shippingAddress?.pin}
                </p>
                <p className="flex items-center gap-2 text-gray-500 mt-2">
                  <Phone className="w-3 h-3" /> {order.shippingAddress?.mobile}
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Package className="w-4 h-4 text-[#FF4B2B]" /> Order Items
            </h3>
            <div className="border rounded-lg divide-y divide-gray-100">
              {order.items.map((item, index) => (
                <div key={index} className="p-4 flex items-center gap-4">
                  <img
                    src={item.foodImage}
                    alt={item.foodName}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.foodName}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      ₹{item.totalPrice}
                    </p>
                    <p className="text-xs text-gray-400">₹{item.price} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-blue-50 p-4 rounded-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-semibold text-blue-900">
                  Payment Info
                </p>
                <p className="text-xs text-blue-700">
                  {order.paymentDetails?.paymentMethod} -{" "}
                  {order.paymentDetails?.status}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-blue-700">Total Amount</p>
              <p className="text-xl font-bold text-blue-900">
                ₹{order.totalAmount}
              </p>
            </div>
          </div>

          {/* Actions */}
          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                Update Status:
              </span>
              <select
                value={order.status}
                onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                className="px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:border-[#FF4B2B] bg-white cursor-pointer"
                disabled={
                  order.status === "DELIVERED" || order.status === "CANCELLED"
                }
              >
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirm</option>
                <option value="PREPARING">Preparing</option>
                <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancel</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button
                onClick={() =>
                  navigate(`/auth/admin/orders/invoice/${order.id}`)
                }
                className="bg-gray-800 hover:bg-gray-900 text-white flex items-center gap-2"
              >
                <Printer className="w-4 h-4" /> Print Bill
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
