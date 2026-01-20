import { useState } from "react";
import { FoodList } from "./FoodList";
import { FoodModal } from "./FoodModal";

export const FoodPage = () => {
  const [foods, setFoods] = useState([
    {
      id: 1,
      name: "Paneer Burger",
      price: 120,
      types: ["veg", "snacks"],
      imageUrl:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60",
      availability: true,
      quantity: "20 plates",
      comments: "Delicious grilled paneer with fresh veggies.",
    },
    {
      id: 2,
      name: "Chicken Pizza",
      price: 299,
      types: ["non-veg"],
      imageUrl:
        "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=60",
      availability: true,
      quantity: "15 pieces",
      comments: "Cheesy delight with spicy chicken chunks.",
    },
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
          f.id === editingFood.id ? { ...foodData, id: f.id } : f,
        ),
      );
    } else {
      // Add
      setFoods([...foods, { ...foodData, id: Date.now() }]);
    }
    setOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Food Items</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your restaurant menu
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-linear-to-r from-[#FF4B2B] to-[#FF416C] text-white px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-[#FF4B2B]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm flex items-center gap-2"
        >
          <span className="text-lg leading-none">+</span> Add Food
        </button>
      </div>

      <FoodList foods={foods} onEdit={handleEdit} onDelete={handleDelete} />

      <FoodModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        initialData={editingFood}
      />
    </div>
  );
};
