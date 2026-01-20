import { useState } from "react";
import { MapPin, Plus, CheckCircle } from "lucide-react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";

export const AddressSection = ({ onSelect }) => {
  const [selectedId, setSelectedId] = useState("addr_1"); // Default to first address
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock saved addresses
  const savedAddresses = [
    {
      id: "addr_1",
      type: "Home",
      name: "Ritik Kumar",
      phone: "+91 98765 43210",
      street: "123, Green Park Main Road",
      city: "New Delhi",
      district: "South Delhi",
      state: "Delhi",
      pin: "110016",
      country: "India",
    },
    {
      id: "addr_2",
      type: "Work",
      name: "Ritik Kumar",
      phone: "+91 98765 43210",
      street: "456, Cyber City, Tower B",
      city: "Gurugram",
      district: "Gurugram",
      state: "Haryana",
      pin: "122002",
      country: "India",
    },
  ];

  const [formData, setFormData] = useState({
    street: "",
    city: "",
    district: "",
    state: "",
    pin: "",
    country: "India",
  });

  const handleSelect = (addr) => {
    setSelectedId(addr.id);
    const fullAddr = `${addr.street}, ${addr.city}, ${addr.district}, ${addr.state} - ${addr.pin}, ${addr.country}`;
    onSelect(fullAddr);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveAddress = () => {
    if (formData.street && formData.city && formData.pin) {
      const fullAddr = `${formData.street}, ${formData.city}, ${formData.district}, ${formData.state} - ${formData.pin}, ${formData.country}`;
      onSelect(fullAddr);
      setSelectedId("new"); // Mark as new/custom address
      setIsModalOpen(false);
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
      <div className="space-y-3">
        {savedAddresses.map((addr) => (
          <div
            key={addr.id}
            onClick={() => handleSelect(addr)}
            className={`
              relative p-4 rounded-xl border-2 cursor-pointer transition-all
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
                  <span className="text-sm text-gray-500">| {addr.name}</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-1">
                  {addr.street}, {addr.city}, {addr.district}
                </p>
                <p className="text-sm text-gray-600">
                  {addr.state} -{" "}
                  <span className="font-medium text-gray-900">{addr.pin}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Phone: {addr.phone}
                </p>
              </div>
              {selectedId === addr.id && (
                <CheckCircle className="w-5 h-5 text-[#FF4B2B]" />
              )}
            </div>
          </div>
        ))}

        {/* Add New Address Trigger */}
        <div
          onClick={() => setIsModalOpen(true)}
          className={`
            p-4 rounded-xl border-2 cursor-pointer dashed border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-50 hover:border-gray-400 transition
            ${selectedId === "new" ? "border-[#FF4B2B] border-solid bg-orange-50/30" : ""}
          `}
        >
          <Plus className="w-5 h-5 text-gray-500" />
          <span className="font-medium text-gray-600">
            {selectedId === "new" ? "Using New Address" : "Add New Address"}
          </span>
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
