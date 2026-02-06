import { Star } from "lucide-react";

export const ReviewCard = ({ review }) => {
  return (
    <div className="w-80 shrink-0 bg-white rounded-2xl p-5 shadow-xs border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={review.avatar}
          alt={review.name}
          className="w-10 h-10 rounded-full object-cover bg-gray-100"
        />
        <div>
          <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={
                  i < review.rating
                    ? "fill-orange-400 text-orange-400"
                    : "fill-gray-200 text-gray-200"
                }
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
        "{review.comment}"
      </p>
    </div>
  );
};
