import { useState, useEffect } from "react";
import { MapPin, Plus, CheckCircle, Edit2, Trash2 } from "lucide-react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} from "../../api/address";

export const AddressSection = ({ onSelect }) => {
  const [selectedId, setSelectedId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    street: "",
    city: "",
    district: "",
    state: "",
    pin: "",
    country: "India",
    type: "Home",
  });

  const handleSelect = (addr) => {
    setSelectedId(addr.id);
    const fullAddr = `${addr.street}, ${addr.city}, ${addr.district}, ${addr.state} - ${addr.pin}, ${addr.country}`;
    onSelect(fullAddr);
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await getAddresses();
        setSavedAddresses(data);
        // Select first default if available
        if (data.length > 0) {
          const defaultAddr = data.find((a) => a.id === 1) || data[0];
          handleSelect(defaultAddr);
        }
      } catch (error) {
        console.error("Failed to fetch addresses");
      }
    };
    fetchAddresses();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = (addr) => {
    setEditingId(addr.id);
    setFormData({
      street: addr.street,
      city: addr.city,
      district: addr.district,
      state: addr.state,
      pin: addr.pin,
      country: addr.country,
      type: addr.type,
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await deleteAddress(id);
        const data = await getAddresses();
        setSavedAddresses(data);
        if (selectedId === id) {
          setSelectedId("");
          onSelect("");
        }
      } catch (error) {
        alert("Failed to delete address");
      }
    }
  };

  const handleSaveAddress = async () => {
    if (formData.street && formData.city && formData.pin) {
      try {
        if (editingId) {
          await updateAddress(editingId, formData);
        } else {
          await addAddress(formData);
        }

        const data = await getAddresses();
        setSavedAddresses(data);

        // If adding new, select it. If editing, it stays selected if it was.
        if (!editingId) {
          const newAddr = data[data.length - 1];
          if (newAddr) {
            handleSelect(newAddr);
          }
        } else if (selectedId === editingId) {
          // Re-select to update display text
          const updatedAddr = data.find((a) => a.id === editingId);
          if (updatedAddr) handleSelect(updatedAddr);
        }

        setIsModalOpen(false);
        setEditingId(null);
        setFormData({
          street: "",
          city: "",
          district: "",
          state: "",
          pin: "",
          country: "India",
          type: "Home",
        });
      } catch (error) {
        alert("Failed to save address");
      }
    } else {
      alert("Please fill in Street, City and PIN Code");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-[#FF4B2B]" />
        <h2 className="text-lg font-bold text-gray-800">Delivery Address</h2>
      </div>

      {/* Saved Addresses List */}
      {/* Saved Addresses List */}
      <div className="space-y-3">
        {Array.isArray(savedAddresses) &&
          (savedAddresses.length > 2 && !showAll
            ? savedAddresses.slice(0, 2)
            : savedAddresses
          ).map((addr) => (
            <div
              key={addr.id}
              onClick={() => handleSelect(addr)}
              className={`
              relative p-4 rounded-xl border-2 cursor-pointer transition-all group
              ${
                selectedId === addr.id
                  ? "border-[#FF4B2B] bg-orange-50/50"
                  : "border-gray-100 hover:border-orange-200 hover:bg-gray-50"
              }
            `}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900">{addr.type}</span>
                    <span className="text-sm text-gray-500">
                      | {addr.name || "User"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-1">
                    {addr.street}, {addr.city}, {addr.district}
                  </p>
                  <p className="text-sm text-gray-600">
                    {addr.state} -{" "}
                    <span className="font-medium text-gray-900">
                      {addr.pin}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Phone: {addr.phone || "N/A"}
                  </p>

                  {/* Edit/Delete Actions */}
                  <div className="flex items-center gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(addr);
                      }}
                      className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-[#FF4B2B] transition-colors"
                    >
                      <Edit2 className="w-3 h-3" /> Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(addr.id);
                      }}
                      className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  </div>
                </div>
                {selectedId === addr.id && (
                  <CheckCircle className="w-5 h-5 text-[#FF4B2B]" />
                )}
              </div>
            </div>
          ))}

        {savedAddresses.length > 2 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-[#FF4B2B] font-medium hover:underline w-full text-center py-1"
          >
            {showAll
              ? "Show Less"
              : `+ ${savedAddresses.length - 2} More Addresses`}
          </button>
        )}

        {/* Add New Address Trigger */}
        <div
          onClick={() => {
            setEditingId(null);
            setFormData({
              street: "",
              city: "",
              district: "",
              state: "",
              pin: "",
              country: "India",
              type: "Home",
            });
            setIsModalOpen(true);
          }}
          className={`
            p-4 rounded-xl border-2 cursor-pointer dashed border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-50 hover:border-gray-400 transition
            ${selectedId === "new" ? "border-[#FF4B2B] border-solid bg-orange-50/30" : ""}
          `}
        >
          <Plus className="w-5 h-5 text-gray-500" />
          <span className="font-medium text-gray-600">Add New Address</span>
        </div>
      </div>

      {/* Address Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4 text-gray-900">
          Add New Address
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto px-1">
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleFormChange}
              className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-[#FF4B2B]"
            >
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Street Address
            </label>
            <input
              name="street"
              value={formData.street}
              onChange={handleFormChange}
              placeholder="House No, Building, Street Area"
              className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-[#FF4B2B] focus:ring-1 focus:ring-[#FF4B2B]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              name="city"
              value={formData.city}
              onChange={handleFormChange}
              placeholder="City"
              className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-[#FF4B2B] focus:ring-1 focus:ring-[#FF4B2B]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              District
            </label>
            <input
              name="district"
              value={formData.district}
              onChange={handleFormChange}
              placeholder="District"
              className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-[#FF4B2B] focus:ring-1 focus:ring-[#FF4B2B]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              State
            </label>
            <input
              name="state"
              value={formData.state}
              onChange={handleFormChange}
              placeholder="State"
              className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-[#FF4B2B] focus:ring-1 focus:ring-[#FF4B2B]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              PIN Code
            </label>
            <input
              name="pin"
              value={formData.pin}
              onChange={handleFormChange}
              placeholder="110001"
              maxLength={6}
              className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-[#FF4B2B] focus:ring-1 focus:ring-[#FF4B2B]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Country
            </label>
            <input
              name="country"
              value={formData.country}
              disabled
              className="w-full border border-gray-200 rounded-lg p-3 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="mt-6">
          <Button onClick={handleSaveAddress} className="w-full">
            Save & Deliver Here
          </Button>
        </div>
      </Modal>
    </div>
  );
};
