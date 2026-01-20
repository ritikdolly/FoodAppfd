import { OrderStatusDropdown } from "./OrderStatusDropdown";

export const OrderList = () => {
  const orders = [{ id: 101, user: "Ritik", status: "PLACED" }];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Orders</h2>

      {orders.map(order => (
        <div
          key={order.id}
          className="bg-white p-4 rounded-lg mb-3 flex justify-between"
        >
          <p>Order #{order.id} - {order.user}</p>
          <OrderStatusDropdown />
        </div>
      ))}
    </div>
  );
};

