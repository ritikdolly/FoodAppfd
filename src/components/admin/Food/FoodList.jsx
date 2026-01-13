import { FoodCard } from "./FoodCard";

export const FoodList = () => {
  const foods = [
    { id: 1, name: "Paneer Pizza", price: 249, status: "Available" },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Food Items</h2>
      <div className="grid grid-cols-3 gap-4">
        {foods.map(food => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </div>
  );
};
