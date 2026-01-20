import { Modal } from "../../ui/Modal";


export const AddOfferModal = ({ open, onClose }) => (
  <Modal open={open} onClose={onClose}>
    <h2 className="text-lg font-semibold mb-3">Add Offer</h2>

    <input
      className="w-full border p-2 mb-2"
      placeholder="Offer title"
    />

    <input
      className="w-full border p-2 mb-2"
      placeholder="Discount %"
    />

    <button className="w-full bg-orange-600 text-white py-2 rounded">
      Save Offer
    </button>
  </Modal>
);
