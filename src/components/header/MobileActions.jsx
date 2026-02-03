import { Menu, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const MobileActions = ({ cartCount, onOpen, isLoggedIn, onLogin }) => {
  const navigate = useNavigate();

  return (
    <div className="md:hidden flex items-center gap-3">
      <button
        aria-label="Cart"
        onClick={() => {
          if (isLoggedIn) {
            navigate("/auth/customer/cart");
          } else {
            onLogin();
          }
        }}
        className="relative p-2 rounded-lg hover:bg-gray-100"
      >
        <ShoppingCart className="w-6 h-6" />
        {cartCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#FF4B2B] rounded-full" />
        )}
      </button>

      <button
        aria-label="Open menu"
        onClick={onOpen}
        className="p-1 rounded-lg hover:bg-gray-100 ml-1"
      >
        {/* Show Avatar if logged in, else Menu icon */}
        {/* But for now, let's keep it simple: Menu icon always opens drawer, which contains profile */}
        {/* We could enhance this to show Avatar instead of Menu icon if logged in */}
        <Menu className="w-6 h-6" />
      </button>
    </div>
  );
};
