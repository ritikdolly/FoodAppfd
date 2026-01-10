export const ProductMeta = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 space-y-2 bg-gray-50">
      <p>
        <strong>Status:</strong>{" "}
        {product.availability ? "Available" : "Out of stock"}
      </p>

      <p>
        <strong>Comments:</strong>{" "}
        {product.comments || "No comments"}
      </p>
    </div>
  );
};
