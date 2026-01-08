import { Heart, ShoppingCart } from "lucide-react";

export const DesktopActions = ({ cartCount }) => (
  <div className="hidden md:flex items-center gap-3 border-l pl-6">
    <button className="p-2 hover:bg-gray-100 rounded-full">
      <Heart className="w-5 h-5" />
    </button>

    <button className="relative p-2 hover:bg-orange-50 rounded-full">
      <ShoppingCart className="w-5 h-5" />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-1.5 rounded-full border-2 border-white">
          {cartCount}
        </span>
      )}
    </button>

    <div className="flex items-center gap-2 p-1.5 pr-3 hover:bg-gray-100 rounded-full">
      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600">
        RK
      </div>
      <span className="hidden lg:block text-sm font-medium">Sign In</span>
    </div>
  </div>
);
