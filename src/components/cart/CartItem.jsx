import { Minus, Plus, Trash2 } from "lucide-react";

export const CartItem = ({ item, onQtyChange, onRemove }) => {
  return (
    <div className="flex gap-4 items-center bg-white rounded-xl p-4 shadow-sm">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-20 h-20 rounded-lg object-cover"
      />

      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-500">₹{item.price}</p>

        <div className="flex items-center gap-2 mt-2">
          <button onClick={() => onQtyChange(item.id, item.quantity - 1)}>
            <Minus size={16} />
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => onQtyChange(item.id, item.quantity + 1)}>
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="text-right">
        <p className="font-semibold">
          ₹{item.price * item.quantity}
        </p>
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 mt-2"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};
