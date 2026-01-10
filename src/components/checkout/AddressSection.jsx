import { useState } from "react";

export const AddressSection = ({ onSelect }) => {
  const [address, setAddress] = useState("");

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
      <h2 className="text-lg font-semibold">Delivery Address</h2>

      <textarea
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
          onSelect(e.target.value);
        }}
        placeholder="Enter your full delivery address"
        className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        rows={4}
      />
    </div>
  );
};
