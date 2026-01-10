export const OrderItems = ({ items }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
      <h2 className="text-lg font-semibold">Order Items</h2>

      {items.map((item) => (
        <div key={item.id} className="flex justify-between items-center">
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-500">
              Qty: {item.quantity}
            </p>
          </div>

          <span className="font-medium">
            ₹{item.price * item.quantity}
          </span>
        </div>
      ))}
    </div>
  );
};
