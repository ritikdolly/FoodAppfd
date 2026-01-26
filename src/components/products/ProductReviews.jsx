import { useState } from "react";
import { addReview, deleteReview } from "../../api/foods";
import { USER_ID } from "../../constants";
import { Trash2 } from "lucide-react";

export const ProductReviews = ({ reviews, productId, onUpdate }) => {
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.comment) return;
    try {
      setSubmitting(true);
      await addReview(productId, { ...newReview, user: "Demo User" }); // Using hardcoded name for now
      setNewReview({ rating: 5, comment: "" });
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (confirm("Delete this review?")) {
      try {
        await deleteReview(productId, reviewId);
        if (onUpdate) onUpdate();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

      {/* Review Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-200"
      >
        <h3 className="text-lg font-semibold mb-3">Write a Review</h3>
        <div className="flex gap-4 mb-3">
          <label className="flex items-center gap-2">
            <span className="text-sm font-medium">Rating:</span>
            <select
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: Number(e.target.value) })
              }
              className="px-3 py-1 bg-white border rounded-md"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Stars
                </option>
              ))}
            </select>
          </label>
        </div>
        <textarea
          placeholder="Share your thoughts..."
          value={newReview.comment}
          onChange={(e) =>
            setNewReview({ ...newReview, comment: e.target.value })
          }
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FF4B2B]/20 outline-none mb-3"
          rows={3}
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-[#FF4B2B] text-white rounded-lg hover:bg-[#e04326] disabled:bg-gray-300 transition-colors"
        >
          {submitting ? "Submitting..." : "Post Review"}
        </button>
      </form>

      {/* Review List */}
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet. Be the first!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 bg-white relative group"
            >
              <div className="flex justify-between">
                <span className="font-medium">
                  {review.user || "Anonymous"}
                </span>
                <span className="text-green-600">⭐ {review.rating}</span>
              </div>
              <p className="text-gray-600 mt-1">{review.comment}</p>
              <div className="text-xs text-gray-400 mt-2">
                {review.date ? new Date(review.date).toLocaleDateString() : ""}
              </div>

              {/* Admin Delete Button */}
              <button
                onClick={() => handleDelete(review.id)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete Review (Admin)"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
