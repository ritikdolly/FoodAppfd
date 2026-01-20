import { Edit2, Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";

export const FoodCard = ({ food, onEdit, onDelete }) => {
  return (
    <Card className="p-0 overflow-hidden group border border-gray-100/50 hover:border-[#FF4B2B]/20">
      {/* IMAGE */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {food.imageUrl ? (
          <img
            src={food.imageUrl}
            alt={food.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
            <span className="text-sm">No Image</span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span
            className={`px-2 py-1 rounded-md text-xs font-bold shadow-sm ${food.availability ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            {food.availability ? "Active" : "Unavailable"}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-gray-800 line-clamp-1 text-lg mb-1">
              {food.name}
            </h3>
            <div className="flex flex-wrap gap-1">
              {/* Handle both new 'types' array and legacy 'category' string */}
              {(food.types || (food.category ? [food.category] : [])).map(
                (type) => (
                  <span
                    key={type}
                    className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border ${
                      type.toLowerCase().includes("veg") &&
                      !type.toLowerCase().includes("non")
                        ? "bg-green-50 text-green-600 border-green-200"
                        : type.toLowerCase().includes("non")
                          ? "bg-red-50 text-red-600 border-red-200"
                          : "bg-orange-50 text-orange-600 border-orange-200"
                    }`}
                  >
                    {type}
                  </span>
                ),
              )}
            </div>
          </div>
          <span className="font-bold text-lg text-[#FF4B2B]">
            ₹{food.price}
          </span>
        </div>

        <p className="text-gray-500 text-sm line-clamp-2 min-h-[40px] mb-2">
          {food.comments || "No description available."}
        </p>

        <div className="flex items-center gap-2 mb-4 text-xs font-medium text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
          <span>Qty Available:</span>
          <span className="text-gray-900 font-bold">
            {food.quantity || "N/A"}
          </span>
        </div>

        <div className="flex gap-2 pt-2 border-t border-gray-100">
          <Button
            onClick={onEdit}
            variant="outline"
            className="flex-1 rounded-lg py-2 text-sm h-auto border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-[#FF4B2B] hover:border-[#FF4B2B]/30"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            onClick={onDelete}
            variant="ghost"
            className="px-3 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
