import { useEffect, useState } from "react";
import { FoodList } from "./FoodList";
import { FoodModal } from "./FoodModal";
import {
  createFood,
  deleteFood,
  getAllFoods,
  updateFood,
} from "../../../api/foods";

export const FoodPage = () => {
  const [foods, setFoods] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingFood, setEditingFood] = useState(null);

  // Fetch when page loads
  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      // setLoading(true);
      const data = await getAllFoods();
      console.log(data);
      setFoods(data || []); // if null, set empty array
    } catch (err) {
      console.log(err);
      setFoods([]);
    } finally {
      // setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingFood(null);
    setOpen(true);
  };

  const handleEdit = (food) => {
    setEditingFood(food);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this food item?")) {
      try {
        await deleteFood(id);
        fetchFoods();
      } catch (error) {
        console.error("Error deleting food:", error);
      }
    }
  };

  const handleSave = async (foodData) => {
    try {
      if (editingFood) {
        // Edit existing
        await updateFood(editingFood.id, foodData);
      } else {
        // Add new
        await createFood(foodData);
      }
      fetchFoods(); // Refresh list
      setOpen(false);
    } catch (error) {
      console.error("Error saving food:", error);
      alert(
        "Failed to save food: " +
          (error.response?.data?.message || error.message),
      );
    }
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
