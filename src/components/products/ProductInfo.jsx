export const ProductInfo = ({ product }) => {
  return (
    <>
      <h1 className="text-3xl font-bold">{product.name}</h1>

      <div className="flex items-center gap-4">
        <span className="text-green-600 font-medium">
          ⭐ {product.rating}
        </span>
        <span className="text-gray-500">
          ({product.reviews.length} reviews)
        </span>
      </div>

      <p className="text-2xl font-bold text-orange-600">
        ₹{product.price}
      </p>

      <p className="text-gray-600">
        Quantity: {product.quantity}
      </p>

      <div className="flex gap-2 flex-wrap">
        {product.types.map((type) => (
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
        className="mt-4 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-300"
      >
        Add to Cart
      </button>
    </>
  );
};
