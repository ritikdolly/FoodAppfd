import { Menu, ShoppingCart } from "lucide-react";

export const MobileActions = ({ cartCount, onOpen }) => (
  <div className="md:hidden flex items-center gap-3">
    <button
      aria-label="Cart"
      className="relative p-2 rounded-lg hover:bg-gray-100"
    >
      <ShoppingCart className="w-6 h-6" />
      {cartCount > 0 && (
        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-orange-500 rounded-full" />
      )}
    </button>

    <button
      aria-label="Open menu"
      onClick={onOpen}
      className="p-2 rounded-lg hover:bg-gray-100"
    >
      <Menu className="w-6 h-6" />
    </button>
  </div>
);
