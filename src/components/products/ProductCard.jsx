import { Link } from "react-router-dom";
import { ProductRating } from "./ProductRating";

export const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden group">
      
      {/* IMAGE + NAME → LINK */}
      <Link
        to={`/product/${product.id}`}
        className="block focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
            {product.name}
          </h3>

          <ProductRating rating={product.rating} />

          <p className="text-sm text-gray-500">{product.quantity}</p>
        </div>
      </Link>

      {/* FOOTER (NOT A LINK) */}
      <div className="px-4 pb-4 flex justify-between items-center">
        <span className="font-bold text-orange-600">
          ₹{product.price}
        </span>

        <button
          disabled={!product.availability}
          className="
            px-4 py-1.5 text-sm rounded-full font-medium
            bg-orange-600 text-white
            hover:bg-orange-700
            active:scale-95
            disabled:bg-gray-300 disabled:cursor-not-allowed
            transition
          "
        >
          Add
        </button>
      </div>
    </div>
  );
};
