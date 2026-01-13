import { OrderCard } from "./OrderCard";

export const MyOrders = () => {
  const orders = [{ id: 101, status: "DELIVERED" }];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Orders</h2>
      {orders.map(order => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};
