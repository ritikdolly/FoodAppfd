import { CartItem } from "./CartItem";

export const CartList = ({ items, onQtyChange, onRemove }) => {
  if (items.length === 0) {
    return (
      <p className="text-gray-500 text-center py-10">
        Your cart is empty
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onQtyChange={onQtyChange}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};
