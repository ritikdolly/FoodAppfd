export const OrderStatusDropdown = ({ status, onChange }) => (
  <select
    className={`border rounded px-3 py-1 font-medium ${
      status === "DELIVERED"
        ? "text-green-600 border-green-200 bg-green-50"
        : status === "CANCELLED"
          ? "text-red-600 border-red-200 bg-red-50"
          : "text-orange-600 border-orange-200 bg-orange-50"
    }`}
    value={status}
    onChange={(e) => onChange(e.target.value)}
  >
    <option value="PLACED">PLACED</option>
    <option value="CONFIRMED">CONFIRMED</option>
    <option value="PREPARING">PREPARING</option>
    <option value="OUT FOR DELIVERY">OUT FOR DELIVERY</option>
    <option value="DELIVERED">DELIVERED</option>
    <option value="CANCELLED">CANCELLED</option>
  </select>
);
