import { useState } from "react";
import { Plus, MapPin, Edit2, Trash2, Home, Briefcase } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";

export const AddressPage = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      name: "Ritik Kumar",
      phone: "+91 98765 43210",
      address: "123, Green Park Residency, Sector 4",
      city: "New Delhi",
      pincode: "110001",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      name: "Ritik Kumar",
      phone: "+91 98765 43210",
      address: "Tech Hub Tower, 5th Floor, Cyber City",
      city: "Gurugram",
      pincode: "122002",
      isDefault: false,
    },
  ]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#FF4B2B] to-[#FF416C]">
          Saved Addresses
        </h1>
        <Button className="flex items-center gap-2 shadow-lg shadow-[#FF4B2B]/20">
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
                  {addr.address}, {addr.city}, {addr.pincode}
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
      </div>
    </div>
  );
};
