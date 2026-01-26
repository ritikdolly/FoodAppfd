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
  const [filterType, setFilterType] = useState("All");
  const [filterPrice, setFilterPrice] = useState("All");

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

  // Derive unique types from foods
  const uniqueTypes = [...new Set(foods.flatMap((f) => f.types || []))];

  // Filter logic
  const filteredFoods = foods.filter((food) => {
    // Type Filter
    const matchesType =
      filterType === "All" || (food.types && food.types.includes(filterType));

    // Price Filter
    let matchesPrice = true;
    if (filterPrice !== "All") {
      if (filterPrice === "0-100") matchesPrice = food.price < 100;
      else if (filterPrice === "100-300")
        matchesPrice = food.price >= 100 && food.price <= 300;
      else if (filterPrice === "300-500")
        matchesPrice = food.price > 300 && food.price <= 500;
      else if (filterPrice === "500+") matchesPrice = food.price > 500;
    }

    return matchesType && matchesPrice;
  });

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

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Type
          </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full border-gray-300 border rounded-lg p-2 focus:ring-[#FF4B2B] focus:border-[#FF4B2B]"
          >
            <option value="All">All Types</option>
            {uniqueTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Price
          </label>
          <select
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
            className="w-full border-gray-300 border rounded-lg p-2 focus:ring-[#FF4B2B] focus:border-[#FF4B2B]"
          >
            <option value="All">All Prices</option>
            <option value="0-100">Under ₹100</option>
            <option value="100-300">₹100 - ₹300</option>
            <option value="300-500">₹300 - ₹500</option>
            <option value="500+">Above ₹500</option>
          </select>
        </div>
      </div>

      <FoodList
        foods={filteredFoods}
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
