import { useState } from "react";
import { FoodList } from "./FoodList";
import { FoodModal } from "./FoodModal";

export const FoodPage = () => {
  const [foods, setFoods] = useState([
    { id: 1, name: "Paneer Burger", price: 120, category: "Veg" },
    { id: 2, name: "Chicken Pizza", price: 299, category: "Non-Veg" },
  ]);

  const [open, setOpen] = useState(false);
  const [editingFood, setEditingFood] = useState(null);

  const handleAdd = () => {
    setEditingFood(null);
    setOpen(true);
  };

  const handleEdit = (food) => {
    setEditingFood(food);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setFoods(foods.filter((food) => food.id !== id));
  };

  const handleSave = (foodData) => {
    if (editingFood) {
      // Edit
      setFoods(
        foods.map((f) =>
          f.id === editingFood.id ? { ...foodData, id: f.id } : f
        )
      );
    } else {
      // Add
      setFoods([...foods, { ...foodData, id: Date.now() }]);
    }
    setOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Food Items</h1>
        <button
          onClick={handleAdd}
          className="bg-orange-600 text-white px-4 py-2 rounded"
        >
          + Add Food
        </button>
      </div>

      <FoodList
        foods={foods}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FoodModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        initialData={editingFood}
      />
    </div>
  );
};
