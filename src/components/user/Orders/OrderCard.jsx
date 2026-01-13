import { OrderStatusBadge } from "./OrderStatusBadge";

export const OrderCard = ({ order }) => (
  <div className="border rounded-lg p-4 mb-3 bg-white">
    <p>Order #{order.id}</p>
    <OrderStatusBadge status={order.status} />
  </div>
);
