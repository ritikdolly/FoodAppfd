export const CartSummary = ({ items }) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const delivery = items.length ? 40 : 0;
  const total = subtotal + delivery;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
      <h3 className="text-lg font-semibold">Order Summary</h3>

      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span>₹{subtotal}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span>Delivery</span>
        <span>₹{delivery}</span>
      </div>

      <div className="border-t pt-3 flex justify-between font-semibold">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg">
        Checkout
      </button>
    </div>
  );
};
