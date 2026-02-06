import { useState, useEffect } from "react";
import { ReviewCard } from "./ReviewCard";
import { getReviews, addReview } from "../../api/reviews";
import { useAuth } from "../../context/AuthContext";
import { AddReviewModal } from "./AddReviewModal";
import { Plus, CheckCircle } from "lucide-react";
import { Button } from "../ui/Button";

export const RestaurantReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { currentUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews();
        // Only show trusted reviews on public page
        const trusted = data.filter((r) => r.isTrusted);
        setReviews(trusted);
      } catch (error) {
        console.error("Failed to load reviews");
      }
    };
    fetchReviews();
  }, []);

  const handleAddReview = async (reviewData) => {
    setIsSubmitting(true);
    try {
      await addReview({
        ...reviewData,
        name: currentUser.name || "Customer",
        userId: currentUser.id,
      });
      setIsModalOpen(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error("Failed to submit review", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (reviews.length === 0 && !currentUser) return null;

  return (
    <div className="py-16">
      <div className="flex items-center justify-between mb-8 px-4">
        <div>
          <span className="text-primary font-bold text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h3 className="text-3xl font-bold text-gray-900 mt-2">
            Trusted by Customers
          </h3>
        </div>

        {currentUser && (
          <Button
            onClick={() => setIsModalOpen(true)}
            className="rounded-full bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 flex items-center gap-2 shadow-xs"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Prior Review</span>
          </Button>
        )}
      </div>

      {showSuccess && (
        <div className="mx-4 mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-800 animate-fade-in">
          <CheckCircle size={20} className="text-green-600" />
          <p className="text-sm font-medium">
            Thanks for your review! It has been submitted for approval.
          </p>
        </div>
      )}

      {reviews.length > 0 ? (
        <div className="relative -mx-4 px-4 overflow-hidden">
          <div className="flex gap-4 overflow-x-auto pb-8 pt-2 scrollbar-hide snap-x">
            {reviews.map((review) => (
              <div key={review.id} className="snap-start">
                <ReviewCard review={review} />
              </div>
            ))}
          </div>

          {/* Fade gradients */}
          <div className="absolute top-0 bottom-8 left-0 w-8 bg-linear-to-r from-gray-50 to-transparent pointer-events-none md:hidden" />
          <div className="absolute top-0 bottom-8 right-0 w-8 bg-linear-to-l from-gray-50 to-transparent pointer-events-none md:hidden" />
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-500">
            No reviews yet. Be the first to add one!
          </p>
        </div>
      )}

      <AddReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddReview}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
