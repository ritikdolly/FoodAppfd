import { useState } from "react";
import { Modal } from "../../../components/ui/Modal";
import { Button } from "../../../components/ui/Button";

export const FoodModal = ({ open, onClose, onSave, initialData }) => {
  const [food, setFood] = useState(() => {
    if (initialData) {
      return {
        ...initialData,
        imageUrl: initialData.imageUrl || "",
        types: initialData.types || [],
        offerType: initialData.offerType || "flat",
        offerValue: initialData.offerValue || "",
        offerStartDate: initialData.offerStartDate
          ? new Date(initialData.offerStartDate).toISOString().split("T")[0]
          : "",
        offerEndDate: initialData.offerEndDate
          ? new Date(initialData.offerEndDate).toISOString().split("T")[0]
          : "",
        isOfferActive: initialData.isOfferActive || false,
      };
    }
    return {
      id: null,
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
      offerType: "flat",
      offerValue: "",
      offerStartDate: "",
      offerEndDate: "",
      isOfferActive: false,
    };
  });

  const [imageMode, setImageMode] = useState(() => {
    return initialData &&
      initialData.imageUrl &&
      initialData.imageUrl.startsWith("http")
      ? "url"
      : "upload";
  });

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
    if (food.types.length === 0) {
      alert("Please select at least one Food Type (Veg, Non-Veg, etc.)");
      return;
    }
    if (!food.imageUrl) {
      alert("Please provide an image (Upload or URL)");
      return;
    }

    // Offer Validation & Formatting
    let submissionData = { ...food };
    if (food.isOfferActive) {
      if (!food.offerStartDate || !food.offerEndDate) {
        alert("Please select both Start and End dates for the offer.");
        return;
      }

      if (!food.offerValue || food.offerValue <= 0) {
        alert("Please enter a valid Offer Value.");
        return;
      }

      const start = new Date(food.offerStartDate);
      const end = new Date(food.offerEndDate);

      if (end <= start) {
        alert("Offer End Date must be after Start Date.");
        return;
      }

      // Ensure Start Date is 00:00:00 and End Date is 23:59:59 local time
      // We append time strings to the YYYY-MM-DD input values
      const startDateWithTime = new Date(`${food.offerStartDate}T00:00:00`);
      const endDateWithTime = new Date(`${food.offerEndDate}T23:59:59`);

      submissionData.offerStartDate = startDateWithTime.toISOString();
      submissionData.offerEndDate = endDateWithTime.toISOString();
    }

    onSave(submissionData);
  };

  const inputClass =
    "w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4B2B]/50 focus:border-[#FF4B2B] transition-all";

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {initialData ? "Edit Food" : "Add New Food"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-6">
          {/* Section: Image & Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
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
                    Upload
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
                  <span className="text-sm font-medium text-gray-700">URL</span>
                </label>
              </div>

              {/* IMAGE PREVIEW / INPUT */}
              {imageMode === "upload" ? (
                <div className="relative w-full h-48 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-[#FF4B2B] transition-colors cursor-pointer group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  {food.imageUrl ? (
                    <>
                      <img
                        src={food.imageUrl}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="text-white font-medium text-sm">
                          Change Image
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-gray-400 group-hover:text-[#FF4B2B]">
                      <span className="block text-2xl mb-1">+</span>
                      <span className="text-sm font-medium">Upload Image</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="url"
                    placeholder="Paste Image URL here..."
                    value={food.imageUrl || ""}
                    onChange={(e) =>
                      setFood({ ...food, imageUrl: e.target.value })
                    }
                    className={inputClass}
                  />
                  {food.imageUrl && (
                    <div className="w-full h-48 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                      <img
                        src={food.imageUrl}
                        alt="preview"
                        className="w-full h-full object-cover"
                        onError={(e) =>
                          (e.target.src =
                            "https://placehold.co/400x300?text=Invalid+URL")
                        }
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <input
                name="name"
                placeholder="Food Name"
                value={food.name}
                onChange={handleChange}
                className={inputClass}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  name="price"
                  type="text"
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
                  required
                />
              </div>

              <div>
                <p className="text-sm font-medium mb-2 text-gray-700">
                  Food Type
                </p>
                <div className="flex gap-2 flex-wrap">
                  {["veg", "non-veg", "snacks", "drinks", "sweets", "cake"].map(
                    (type) => (
                      <label
                        key={type}
                        className={`cursor-pointer px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
                          food.types.includes(type)
                            ? "bg-[#FF4B2B]/10 border-[#FF4B2B] text-[#FF4B2B]"
                            : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={food.types.includes(type)}
                          onChange={() => handleTypeChange(type)}
                          className="hidden"
                        />
                        <span className="capitalize">{type}</span>
                      </label>
                    ),
                  )}
                </div>
              </div>

              <textarea
                name="comments"
                placeholder="Description / Comments"
                value={food.comments}
                onChange={handleChange}
                className={`${inputClass} h-24 resize-none`}
              />
            </div>
          </div>

          {/* Section: Offers & Availability */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#FF4B2B] rounded-full"></span>
              Offers & Availability
            </h3>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                <div
                  className={`w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out ${food.availability ? "bg-green-500" : ""}`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${food.availability ? "translate-x-4" : ""}`}
                  ></div>
                </div>
                <input
                  type="checkbox"
                  checked={food.availability}
                  onChange={() =>
                    setFood({ ...food, availability: !food.availability })
                  }
                  className="hidden"
                />
                Available to Order
              </label>

              {food.isOfferActive ? (
                <button
                  type="button"
                  onClick={() =>
                    setFood({
                      ...food,
                      isOfferActive: false,
                      offerType: "flat",
                      offerValue: "",
                      offerStartDate: "",
                      offerEndDate: "",
                    })
                  }
                  className="flex items-center gap-1 text-sm font-bold text-red-500 hover:text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 transition-colors"
                >
                  <span>🗑</span> Remove Offer
                </button>
              ) : (
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors">
                  <input
                    type="checkbox"
                    checked={food.isOfferActive}
                    onChange={() =>
                      setFood({ ...food, isOfferActive: !food.isOfferActive })
                    }
                    className="w-4 h-4 accent-[#FF4B2B]"
                  />
                  Activate Offer
                </label>
              )}
            </div>

            {food.isOfferActive && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 pt-2 border-t border-gray-200/50">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Offer Type
                    </label>
                    <div className="flex bg-white rounded-lg border border-gray-200 p-1">
                      {["flat", "percentage"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFood({ ...food, offerType: type })}
                          className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                            food.offerType === type
                              ? "bg-[#FF4B2B] text-white shadow-sm"
                              : "text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {type === "flat" ? "Flat (₹)" : "Percent (%)"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Offer Value
                    </label>
                    <input
                      name="offerValue"
                      type="number"
                      placeholder={
                        food.offerType === "percentage" ? "e.g. 20" : "e.g. 50"
                      }
                      value={food.offerValue}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Start Date
                    </label>
                    <input
                      name="offerStartDate"
                      type="date"
                      value={food.offerStartDate}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      End Date
                    </label>
                    <input
                      name="offerEndDate"
                      type="date"
                      value={food.offerEndDate}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full mt-6 py-3 shadow-lg shadow-[#FF4B2B]/20"
        >
          {initialData ? "Update Food Item" : "Create Food Item"}
        </Button>
      </form>
    </Modal>
  );
};
