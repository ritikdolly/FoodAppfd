import { useState } from "react";
import { AddOfferModal } from "./AddOfferModal";

export const OffersPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Offers</h2>

        <button
          onClick={() => setOpen(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded"
        >
          + Add Offer
        </button>
      </div>

      {/* Offer list can come here later */}
      <p className="text-gray-600">No offers available.</p>

      {/* MODAL */}
      <AddOfferModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};
