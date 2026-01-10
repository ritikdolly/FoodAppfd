export const ProductReviews = ({ reviews }) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">
        Customer Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="border rounded-lg p-4"
            >
              <div className="flex justify-between">
                <span className="font-medium">
                  {review.user}
                </span>
                <span className="text-green-600">
                  ⭐ {review.rating}
                </span>
              </div>
              <p className="text-gray-600 mt-1">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
