import { useState, useEffect } from "react";
import { Plus, MapPin, Edit2, Trash2, Home, Briefcase } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Modal } from "../../components/ui/Modal";
import { addAddress, getAddresses } from "../../api/address";

export const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    district: "",
    state: "",
    pin: "",
    country: "India",
    type: "Home",
  });

  const fetchAddresses = async () => {
    try {
      const data = await getAddresses();
      setAddresses(data);
    } catch (error) {
      // Fallback to empty or error state
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveAddress = async () => {
    try {
      await addAddress(formData);
      setIsModalOpen(false);
      fetchAddresses();
      // Reset form
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
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#FF4B2B] to-[#FF416C]">
          Saved Addresses
        </h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 shadow-lg shadow-[#FF4B2B]/20"
        >
          <Plus className="w-4 h-4" /> Add New Address
        </Button>
      </div>

      <div className="grid gap-6">
        {addresses.map((addr) => (
          <Card
            key={addr.id}
            className={`relative p-6 transition-all ${addr.isDefault ? "ring-2 ring-[#FF4B2B]/20 bg-orange-50/10" : "hover:bg-gray-50"}`}
          >
            {addr.isDefault && (
              <span className="absolute top-0 right-0 bg-[#FF4B2B] text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
                Default
              </span>
            )}

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                {addr.type === "Home" ? (
                  <Home className="w-6 h-6" />
                ) : (
                  <Briefcase className="w-6 h-6" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-lg">{addr.type}</h3>
                  <span className="text-gray-400 text-sm">|</span>
                  <span className="font-medium text-gray-900">{addr.name}</span>
                  <span className="text-gray-500 text-sm">{addr.phone}</span>
                </div>

                <p className="text-gray-600 leading-relaxed mb-4">
                  {addr.street}, {addr.city}, {addr.district}, {addr.state} -{" "}
                  {addr.pin}
                </p>

                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-[#FF4B2B] transition-colors">
                    <Edit2 className="w-4 h-4" /> Edit
                  </button>
                  <button className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>

                  {!addr.isDefault && (
                    <button className="ml-auto text-sm font-semibold text-[#FF4B2B] hover:underline">
                      Set as Default
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
        {addresses.length === 0 && (
          <p className="text-gray-500 text-center col-span-full">
            No addresses found.
          </p>
        )}
      </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4 text-gray-900">
          Add New Address
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleFormChange}
              className="w-full border p-2 rounded"
            >
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <input
            name="street"
            value={formData.street}
            onChange={handleFormChange}
            placeholder="Street"
            className="w-full border p-2 rounded"
          />
          <input
            name="city"
            value={formData.city}
            onChange={handleFormChange}
            placeholder="City"
            className="w-full border p-2 rounded"
          />
          <input
            name="district"
            value={formData.district}
            onChange={handleFormChange}
            placeholder="District"
            className="w-full border p-2 rounded"
          />
          <input
            name="state"
            value={formData.state}
            onChange={handleFormChange}
            placeholder="State"
            className="w-full border p-2 rounded"
          />
          <input
            name="pin"
            value={formData.pin}
            onChange={handleFormChange}
            placeholder="PIN Code"
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveAddress}>Save Address</Button>
        </div>
      </Modal>
    </div>
  );
};
