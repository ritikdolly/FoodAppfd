import { useCart } from "../../context/CartContext";
import { CartList } from "../../components/cart/CartList";
import { CartSummary } from "../../components/cart/CartSummary";

export const CartPage = () => {
  const { cartItems, updateQty, removeFromCart } = useCart();

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-8">My Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <CartList
              items={cartItems}
              onQtyChange={updateQty}
              onRemove={removeFromCart}
            />
          </div>

          {/* Summary */}
          <CartSummary items={cartItems} />
        </div>
      </div>
    </main>
  );
};
