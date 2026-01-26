import { useState, useEffect, useCallback } from "react";
import { useCart } from "../../context/CartContext";
import { Heart } from "lucide-react";
import { addFavorite, removeFavorite, getFavorites } from "../../api/user";
import { USER_ID } from "../../constants";

export const ProductInfo = ({ product }) => {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

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
        <button
          onClick={toggleFavorite}
          className={`p-2 rounded-full transition-colors ${
            isFavorite
              ? "bg-red-50 text-red-500"
              : "bg-gray-100 text-gray-400 hover:text-red-500"
          }`}
        >
          <Heart className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="flex items-center gap-4 mt-2">
        <span className="text-green-600 font-medium">⭐ {product.rating}</span>
        <span className="text-gray-500">
          ({product.reviews?.length || 0} reviews)
        </span>
      </div>

      <p className="text-2xl font-bold text-orange-600 mt-4">
        ₹{product.price}
      </p>

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

      <button
        disabled={!product.availability}
        onClick={() => addToCart(product)}
        className="mt-6 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-300 w-full md:w-auto"
      >
        Add to Cart
      </button>
    </>
  );
};
