import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { useCart } from "../../context/CartContext";
import { Plus } from "lucide-react";

export const FoodVerticalCard = ({ product }) => {
  const { addToCart, cartItems } = useCart();
  const isInCart = cartItems.some((item) => item.id === product.id);

  return (
    <Card className="overflow-hidden group flex flex-col h-full border-0 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white rounded-2xl">
      <Link
        to={`/product/${product.id}`}
        className="relative block overflow-hidden aspect-4/3"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <div className="mb-2">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>

          <p className="text-sm text-gray-500 line-clamp-2">
            {product.description || product.comments}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3 text-primary">
          <span className="text-lg font-bold">₹{product.price}</span>
          <Button
            onClick={() => addToCart(product)}
            className={`rounded-full w-8 h-8 !p-0 flex items-center justify-center transition-all shadow-md ${
              isInCart
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary/90 hover:scale-105 active:scale-95"
            }`}
            disabled={!product.availability || isInCart}
            title={isInCart ? "Already in Cart" : "Add to Cart"}
          >
            <Plus size={18} strokeWidth={3} className="text-white" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
