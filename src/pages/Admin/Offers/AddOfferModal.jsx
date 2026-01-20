import { Modal } from "../../../components/ui/Modal";
import { Button } from "../../../components/ui/Button";

export const AddOfferModal = ({ open, onClose }) => (
  <Modal open={open} onClose={onClose}>
    <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Offer</h2>

    <div className="space-y-4">
      <input
        className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4B2B]/50 focus:border-[#FF4B2B] transition-all"
        placeholder="Offer Title (e.g. Summer Special)"
      />

      <input
        className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4B2B]/50 focus:border-[#FF4B2B] transition-all"
        placeholder="Discount Percentage (e.g. 20%)"
      />

      <Button className="w-full py-3 shadow-lg shadow-[#FF4B2B]/20">
        Create Offer
      </Button>
    </div>
  </Modal>
);
