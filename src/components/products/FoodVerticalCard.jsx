import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { buyNow } from "../../api/foods";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

export const FoodVerticalCard = ({ product }) => {
  const { addToCart, cartItems } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const isInCart = cartItems.some((item) => item.id === product.id);

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
    <Card className="overflow-hidden group flex flex-col h-full border-0 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white rounded-2xl">
      {/* ... Link ... */}
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
          <div className="flex flex-col">
            {product.discountedPrice &&
            product.discountedPrice < product.price ? (
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">
                    ₹{product.discountedPrice}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{product.price}
                  </span>
                </div>
                <span className="text-xs font-bold text-green-600">
                  {product.offerType === "percentage"
                    ? `${product.offerValue}% OFF`
                    : `₹${product.offerValue} OFF`}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold">₹{product.price}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleBuyNow}
              className="rounded-full px-3 py-1 h-8 text-xs font-semibold bg-orange-500 text-white hover:bg-orange-600 shadow-sm transition-all cursor-pointer"
              disabled={!product.availability}
            >
              Buy Now
            </Button>

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
              <Plus size={18} strokeWidth={3} className="text-white cursor-pointer" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
