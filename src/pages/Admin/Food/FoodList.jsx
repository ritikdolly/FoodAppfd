import { FoodCard } from "./FoodCard";

export const FoodList = ({ foods, onEdit, onDelete }) => {
  if (foods.length === 0) {
    return <p className="text-gray-500">No food items added yet.</p>;
  }


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {foods.map((food) => (
        <FoodCard
          key={food.id}
          food={food}
          onEdit={() => onEdit(food)}
          onDelete={() => onDelete(food.id)}
        />
      ))}
    </div>
  );
};
