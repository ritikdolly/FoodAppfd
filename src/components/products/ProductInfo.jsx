import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { buyNow } from "../../api/foods";
import { Heart } from "lucide-react";
import { addFavorite, removeFavorite, getFavorites } from "../../api/user";
import { USER_ID } from "../../constants";
import toast from "react-hot-toast";

export const ProductInfo = ({ product }) => {
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

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

  const checkFavorite = useCallback(async () => {
    try {
      const favs = await getFavorites(USER_ID);
      if (favs && favs.includes(product.id)) {
        setIsFavorite(true);
      }
    } catch (err) {
      console.error(err);
    }
  }, [product.id]);

  // ... (existing useEffect and toggleFavorite)

  // ...

  useEffect(() => {
    checkFavorite();
  }, [checkFavorite]);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await removeFavorite(USER_ID, product.id);
        setIsFavorite(false);
      } else {
        await addFavorite(USER_ID, product.id);
        setIsFavorite(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold">{product.name}</h1>
      </div>

      <div className="mt-4">
        {product.discountedPrice && product.discountedPrice < product.price ? (
          <div className="flex flex-col items-start gap-1">
            <span className="text-3xl font-bold text-[#FF4B2B]">
              ₹{product.discountedPrice}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-lg text-gray-400 line-through font-medium">
                ₹{product.price}
              </span>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase tracking-wide">
                {product.offerType === "percentage"
                  ? `${product.offerValue}% OFF`
                  : `₹${product.offerValue} OFF`}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-3xl font-bold text-[#FF4B2B]">₹{product.price}</p>
        )}
      </div>

      <p className="text-gray-600 mt-2">Quantity: {product.quantity}</p>

      <div className="flex gap-2 flex-wrap mt-4">
        {product.types?.map((type) => (
          <span
            key={type}
            className="px-3 py-1 text-sm rounded-full bg-orange-100 text-orange-700"
          >
            {type}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-6">

        <button
          disabled={!product.availability}
          onClick={handleBuyNow}
          className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-300 w-full md:w-auto transition-colors shadow-md cursor-pointer"
        >
          Buy Now
        </button>

        <button
          disabled={!product.availability}
          onClick={() => addToCart(product)}
          className="px-6 py-3 bg-white text-orange-600 border-2 border-orange-600 rounded-lg hover:bg-orange-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 w-full md:w-auto transition-colors shadow-sm font-semibold cursor-pointer"
        >
          Add to Cart
        </button>

        
      </div>
    </>
  );
};
