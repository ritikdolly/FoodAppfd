import { Link } from "react-router-dom";
import { ProductRating } from "./ProductRating";
import { useCart } from "../../context/CartContext";
import { Button } from "../ui/Button"; // Import Button
import { Card } from "../ui/Card"; // Import Card

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <Card className="p-0 overflow-hidden group h-full flex flex-col hover:shadow-xl transition-shadow duration-300 border-border/50">
      {/* IMAGE + NAME → LINK */}
      <Link
        to={`/product/${product.id}`}
        className="block relative overflow-hidden"
      >
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold shadow-sm">
            {product.time || "30 min"}
          </span>
        </div>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      <div className="p-5 flex flex-col flex-1 gap-2">
        <div className="flex justify-between items-start">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-lg font-bold text-[#2D3436] group-hover:text-[#FF4B2B] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <span className="text-xl font-bold text-[#FF4B2B]">
            ₹{product.price}
          </span>
        </div>

        <ProductRating rating={product.rating} />

        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description || product.quantity}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between gap-3">
          <Button
            onClick={() => addToCart(product)}
            variant="outline"
            className="w-full rounded-xl text-sm py-2 hover:bg-[#FF4B2B] hover:text-white border-[#FF4B2B]/20"
            disabled={!product.availability}
          >
            {product.availability ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </div>
    </Card>
  );
};
