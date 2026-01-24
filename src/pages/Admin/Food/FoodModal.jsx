import { useEffect, useState } from "react";
import { Modal } from "../../../components/ui/Modal";
import { Button } from "../../../components/ui/Button";

export const FoodModal = ({ open, onClose, onSave, initialData }) => {
  const [food, setFood] = useState({
    id: "",
    name: "",
    types: [],
    imageUrl: "",
    price: "",
    rating: 4.5,
    quantity: "",
    comments: "",
    availability: true,
    customerImages: [],
    reviews: [],
  });

  const [imageMode, setImageMode] = useState("upload"); // "upload" or "url"

  useEffect(() => {
    if (initialData) {
      setFood(initialData);
      // If the existing image is a URL (starts with http), default to URL mode (optional heuristic)
      if (initialData.imageUrl && initialData.imageUrl.startsWith("http")) {
        setImageMode("url");
      }
    }
  }, [initialData]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFood({ ...food, imageUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFood({ ...food, [name]: value });
  };

  const handleTypeChange = (type) => {
    setFood((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...food,
      id: food.id || "P" + Date.now(),
    });
  };

  const inputClass =
    "w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4B2B]/50 focus:border-[#FF4B2B] transition-all";

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {initialData ? "Edit Food" : "Add New Food"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* IMAGE INPUT TYPE TOGGLE */}
        <div className="flex gap-4 mb-2">
          <label className="flex items-center cursor-pointer gap-2">
            <input
              type="radio"
              name="imageMode"
              value="upload"
              checked={imageMode === "upload"}
              onChange={() => setImageMode("upload")}
              className="accent-[#FF4B2B]"
            />
            <span className="text-sm font-medium text-gray-700">
              Upload Image
            </span>
          </label>
          <label className="flex items-center cursor-pointer gap-2">
            <input
              type="radio"
              name="imageMode"
              value="url"
              checked={imageMode === "url"}
              onChange={() => setImageMode("url")}
              className="accent-[#FF4B2B]"
            />
            <span className="text-sm font-medium text-gray-700">Image URL</span>
          </label>
        </div>

        {/* IMAGE PREVIEW / INPUT */}
        {imageMode === "upload" ? (
          <div className="flex justify-center">
            <div className="relative w-full h-40 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-[#FF4B2B] transition-colors cursor-pointer group">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              {food.imageUrl ? (
                <img
                  src={food.imageUrl}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-gray-400 group-hover:text-[#FF4B2B]">
                  <span className="block text-2xl mb-1">+</span>
                  <span className="text-sm font-medium">Upload Image</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <input
              type="url"
              placeholder="Paste Image URL here..."
              value={food.imageUrl || ""}
              onChange={(e) => setFood({ ...food, imageUrl: e.target.value })}
              className={inputClass}
            />
            {food.imageUrl && (
              <div className="w-full h-40 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                <img
                  src={food.imageUrl}
                  alt="preview"
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/400x300?text=Invalid+Image+URL")
                  }
                />
              </div>
            )}
          </div>
        )}

        <input
          name="name"
          placeholder="Food Name"
          value={food.name}
          onChange={handleChange}
          className={inputClass}
          required
        />

        <div>
          <p className="text-sm font-medium mb-2 text-gray-700">Food Type</p>
          <div className="flex gap-3 flex-wrap">
            {["veg", "non-veg", "snacks", "drinks"].map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={food.types.includes(type)}
                  onChange={() => handleTypeChange(type)}
                  className="accent-[#FF4B2B]"
                />
                <span className="text-sm capitalize">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="price"
            type="number"
            placeholder="Price (₹)"
            value={food.price}
            onChange={handleChange}
            className={inputClass}
            required
          />
          <input
            name="quantity"
            placeholder="Qty (e.g. 1 plate)"
            value={food.quantity}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <input
          name="comments"
          placeholder="Description / Comments"
          value={food.comments}
          onChange={handleChange}
          className={inputClass}
        />

        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={food.availability}
            onChange={() =>
              setFood({ ...food, availability: !food.availability })
            }
            className="w-4 h-4 accent-[#FF4B2B]"
          />
          Available to Order
        </label>

        <Button
          type="submit"
          className="w-full py-3 shadow-lg shadow-[#FF4B2B]/20"
        >
          Save Food Item
        </Button>
      </form>
    </Modal>
  );
};
