import { Modal } from "../ui/Modal";

export const SignUpModal = ({ open, onClose, onSwitch }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Create Account</h2>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
        />

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700"
        >
          Sign Up
        </button>
      </form>

      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <button
          onClick={onSwitch}
          className="text-orange-600 font-medium"
        >
          Sign In
        </button>
      </p>
    </Modal>
  );
};
