import { useEffect, useState } from "react";
import { Modal } from "../../ui/Modal";

export const FoodModal = ({ open, onClose, onSave, initialData }) => {
  const [food, setFood] = useState({
    id: "",
    name: "",
    types: [],           // 👈 added
    imageUrl: "",
    price: "",
    rating: 4.5,
    quantity: "",
    comments: "",
    availability: true,
    customerImages: [],
    reviews: []
  });

  useEffect(() => {
    if (initialData) {
      setFood(initialData);
    }
  }, [initialData]);

  // 🔹 Image → Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFood({ ...food, imageUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // 🔹 Normal input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFood({ ...food, [name]: value });
  };

  // 🔹 Types checkbox handler
  const handleTypeChange = (type) => {
    setFood((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...food,
      id: food.id || "P" + Date.now()
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-3">
        {initialData ? "Edit Food" : "Add Food"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        {/* FOOD NAME */}
        <input
          name="name"
          placeholder="Food Name"
          value={food.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* TYPES */}
        <div>
          <p className="text-sm font-medium mb-1">Food Type</p>
          <div className="flex gap-4 flex-wrap">
            {["veg", "non-veg", "snacks", "drinks"].map(type => (
              <label key={type} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={food.types.includes(type)}
                  onChange={() => handleTypeChange(type)}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* IMAGE */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full border p-2 rounded"
        />

        {food.imageUrl && (
          <img
            src={food.imageUrl}
            alt="preview"
            className="h-32 w-full object-cover rounded"
          />
        )}

        {/* QUANTITY */}
        <input
          name="quantity"
          placeholder="Quantity (eg: 2 pieces)"
          value={food.quantity}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* PRICE */}
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={food.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* COMMENTS */}
        <input
          name="comments"
          placeholder="Comments (eg: Crispy)"
          value={food.comments}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* AVAILABILITY */}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={food.availability}
            onChange={() =>
              setFood({ ...food, availability: !food.availability })
            }
          />
          Available
        </label>

        {/* SAVE */}
        <button className="w-full bg-orange-600 text-white py-2 rounded">
          Save Food
        </button>
      </form>
    </Modal>
  );
};
