import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { useCart } from "../../context/CartContext";
import { Plus } from "lucide-react";

export const RelatedProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="w-60 shrink-0 bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="flex p-3 gap-3">
        {/* Thumbnail */}
        <Link to={`/product/${product.id}`} className="shrink-0 block relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-20 h-20 rounded-lg object-cover bg-gray-50"
          />
        </Link>

        {/* Info */}
        <div className="flex flex-col flex-1 min-w-0 justify-between py-0.5">
          <Link to={`/product/${product.id}`}>
            <h4 className="font-semibold text-gray-800 text-sm line-clamp-2 leading-tight group-hover:text-primary transition-colors">
              {product.name}
            </h4>
          </Link>

          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-gray-900 text-sm">
              ₹{product.price}
            </span>

            <Button
              onClick={() => addToCart(product)}
              className="w-7 h-7 !p-0 rounded-full bg-none bg-gray-100 text-gray-600 hover:bg-primary hover:text-white flex items-center justify-center shadow-none transition-colors"
              disabled={!product.availability}
              title="Add to Cart"
            >
              <Plus size={16} strokeWidth={2.5} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
