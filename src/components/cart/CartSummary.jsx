import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

export const CartSummary = ({ items }) => {
  const navigate = useNavigate();
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const delivery = items.length && subtotal < 300 ? 40 : 0;
  const total = subtotal + delivery;

  return (
    <Card className="p-6 space-y-6 h-fit sticky top-24">
      <h3 className="text-xl font-bold text-[#2D3436]">Order Summary</h3>

      <div className="space-y-3 text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-[#2D3436]">₹{subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span className="font-semibold text-[#2D3436]">₹{delivery}</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
        <span className="font-bold text-lg text-[#2D3436]">Total</span>
        <span className="font-bold text-2xl text-[#FF4B2B]">₹{total}</span>
      </div>

      <Button
        className="w-full py-4 text-lg rounded-xl shadow-lg shadow-[#FF4B2B]/20"
        onClick={() => navigate("/checkout")}
        disabled={!items.length}
      >
        Proceed to Order
      </Button>
    </Card>
  );
};
