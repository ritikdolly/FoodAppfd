import { useEffect, useState } from "react";
import { getReviews, deleteReview, toggleTrusted } from "../../../api/reviews";
import { Trash2, ShieldCheck, ShieldAlert } from "lucide-react";

export const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = async () => {
    try {
      const data = await getReviews();
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
    if (
      !window.confirm(
        "Are you sure you want to permanently delete this customer review?",
      )
    )
      return;
    try {
      await deleteReview(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Failed to delete review", error);
    }
  };

  const handleToggleTrusted = async (id) => {
    try {
      await toggleTrusted(id);
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, isTrusted: !r.isTrusted } : r)),
      );
    } catch (error) {
      console.error("Failed to toggle trusted status", error);
    }
  };

  if (loading)
    return (
      <div className="p-8 text-center text-gray-500">Loading reviews...</div>
    );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
        <h2 className="text-xl font-bold text-gray-800">Customer Stories</h2>
        <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
          {reviews.length} reviews
        </span>
      </div>

      {/* DESKTOP TABLE VIEW (Hidden on mobile) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Rating</th>
              <th className="px-6 py-4 font-medium w-1/3">Review</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right bg-gray-50/50">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reviews.map((review) => (
              <tr
                key={review.id}
                className="hover:bg-gray-50/50 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover bg-gray-100 ring-2 ring-white shadow-sm"
                    />
                    <span className="font-medium text-gray-900">
                      {review.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex text-orange-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < review.rating ? "opacity-100" : "opacity-30"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p
                    className="text-sm text-gray-600 line-clamp-2 leading-relaxed"
                    title={review.comment}
                  >
                    "{review.comment}"
                  </p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {review.date}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleToggleTrusted(review.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
                      review.isTrusted
                        ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                        : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {review.isTrusted ? (
                      <ShieldCheck size={14} />
                    ) : (
                      <ShieldAlert size={14} />
                    )}
                    {review.isTrusted ? "Trusted" : "Untrusted"}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                    title="Delete Review"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW (Hidden on desktop) */}
      <div className="md:hidden divide-y divide-gray-100">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover bg-gray-100"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{review.name}</h4>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
              </div>
              <div className="flex text-orange-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${i < review.rating ? "opacity-100" : "opacity-30"}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
              "{review.comment}"
            </p>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => handleToggleTrusted(review.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  review.isTrusted
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-gray-50 text-gray-500 border-gray-200"
                }`}
              >
                {review.isTrusted ? (
                  <ShieldCheck size={14} />
                ) : (
                  <ShieldAlert size={14} />
                )}
                {review.isTrusted ? "Trusted" : "Untrusted"}
              </button>

              <button
                onClick={() => handleDelete(review.id)}
                className="text-gray-400 hover:text-red-500 p-2"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="p-12 text-center text-gray-500">No reviews found.</div>
      )}
    </div>
  );
};
