import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { buyNow } from "../../api/foods";
import { Button } from "../ui/Button"; // Import Button
import { Card } from "../ui/Card"; // Import Card
import { Heart } from "lucide-react"; // Import Heart
import toast from "react-hot-toast";

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleBuyNow = async () => {
    if (!currentUser) {
      toast.error("Please login to continue your purchase.");
      navigate("/auth/login");
      return;
    }

    if (!product.availability) return;

    try {
      const order = await buyNow({ foodId: product.id, quantity: 1 });
      navigate(`/checkout?orderId=${order.id}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to process Buy Now");
    }
  };

  return (
    <Card className="p-0 overflow-hidden group h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-border/50">
      {/* ... image link logic ... */}
      {product.id ? (
        <Link
          to={`/product/${product.id}`}
          className="block relative overflow-hidden"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-56 rounded-xl object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/600x400?text=No+Image";
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      ) : (
        <div className="block relative overflow-hidden">
          {/* ... */}
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-56 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/600x400?text=No+Image";
            }}
          />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1 gap-2">
        {/* ... title and price logic ... */}
        <div className="flex justify-between items-start">
          {product.id ? (
            <Link to={`/product/${product.id}`}>
              <h3 className="text-lg font-bold text-[#2D3436] group-hover:text-[#FF4B2B] transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>
          ) : (
            <h3 className="text-lg font-bold text-[#2D3436] line-clamp-1">
              {product.name}
            </h3>
          )}
          {product.discountedPrice &&
          product.discountedPrice < product.price ? (
            <div className="flex flex-col items-end">
              <span className="text-xl font-bold text-[#FF4B2B]">
                ₹{product.discountedPrice}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-green-600 bg-green-50 px-1 rounded">
                  {product.offerType === "percentage"
                    ? `${product.offerValue}% OFF`
                    : `₹${product.offerValue} OFF`}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.price}
                </span>
              </div>
            </div>
          ) : (
            <span className="text-xl font-bold text-[#FF4B2B]">
              ₹{product.price}
            </span>
          )}
        </div>

        <p className="text-sm text-gray-500 line-clamp-2">
          {product.comments || product.description || product.quantity}
        </p>

        <div className="mt-auto pt-2 flex items-center gap-2">
          {/* Buy Now Button */}
          <Button
            onClick={handleBuyNow}
            className="flex-1 rounded-xl text-sm py-2 bg-[#FF4B2B] text-white hover:bg-[#FF4B2B]/90 shadow-md shadow-orange-200 cursor-pointer"
            disabled={!product.availability}
          >
            Buy Now
          </Button>

          {/* Add to Cart Button */}
          <Button
            onClick={() => addToCart(product)}
            variant="outline"
            className="flex-1 rounded-xl text-sm py-2 hover:bg-[#FF4B2B] hover:text-white border-[#FF4B2B]/20 cursor-pointer"
            disabled={!product.availability}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
};
