import { useEffect, useState } from "react";
import { fetchAdminReviews, deleteAdminReview } from "../../../api/admin";
import { Trash2 } from "lucide-react";

export const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = async () => {
    try {
      const data = await fetchAdminReviews();
      setReviews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load reviews", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await deleteAdminReview(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Failed to delete review", error);
    }
  };

  if (loading) return <div>Loading reviews...</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Reviews</h2>

      {/* Group reviews by food */}
      {Object.entries(
        reviews.reduce((acc, review) => {
          const foodName = review.foodName || "Unknown Food";
          if (!acc[foodName]) acc[foodName] = [];
          acc[foodName].push(review);
          return acc;
        }, {}),
      ).map(([foodName, foodReviews]) => (
        <div
          key={foodName}
          className="mb-8 bg-gray-50 p-4 rounded-xl border border-gray-200"
        >
          <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
            <span className="bg-[#FF4B2B] w-2 h-6 rounded-full"></span>
            {foodName}
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({foodReviews.length} reviews)
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {foodReviews.map((review) => (
              <div
                key={review.id}
                className="border rounded-lg p-4 bg-white relative group shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-bold text-gray-800 block">
                      {review.user?.name || review.userName || "Anonymous"}
                    </span>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  <span className="text-orange-500 font-bold bg-orange-50 px-2 py-1 rounded text-sm">
                    {review.rating} ★
                  </span>
                </div>

                <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                  {review.comment}
                </p>

                <button
                  onClick={() => handleDelete(review.id)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity bg-white p-1 rounded-full shadow-sm"
                  title="Delete Review"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {reviews.length === 0 && (
        <div className="bg-white rounded-lg p-12 text-center text-gray-500 border border-dashed border-gray-300">
          No reviews found.
        </div>
      )}
    </div>
  );
};
