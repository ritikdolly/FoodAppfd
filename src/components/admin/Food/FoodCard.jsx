export const FoodCard = ({ food, onEdit, onDelete }) => {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold">{food.name}</h3>
      <p className="text-sm text-gray-600">{food.category}</p>
      <p className="font-medium mt-1">₹{food.price}</p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={onEdit}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 text-sm bg-red-600 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
