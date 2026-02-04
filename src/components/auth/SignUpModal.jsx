import { useState } from "react";
import { Modal } from "../ui/Modal";
import { useAuth } from "../../context/AuthContext";

export const SignUpModal = ({ open, onClose, onSwitch }) => {
  const { register, sendRegisterOtp } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Phone support removed for now, or keep as optional profile field if backend allows
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("CUSTOMER");

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await sendRegisterOtp(email);
      setOtpSent(true);
      alert(`OTP sent to ${email}`);
    } catch (error) {
      console.error("Send OTP error:", error);
      const errorMessage =
        typeof error === "string"
          ? error
          : error?.message || "Failed to send OTP";
      alert(errorMessage);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register({ fullName, email, password, phoneNumber, role, otp });
      alert("Registration Successful!");
      onClose();
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        typeof error === "string"
          ? error
          : error?.message || "Registration failed";
      alert(errorMessage);
    }
  };

  const handleClose = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
    setRole("CUSTOMER");
    setOtp("");
    setOtpSent(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <h2 className="text-xl font-semibold mb-4">
        {otpSent ? "Verify Email" : "Create Account"}
      </h2>

      {!otpSent ? (
        <form className="space-y-4" onSubmit={handleSendOtp}>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
            required
          />
          {/* Optional Phone Number */}
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number (Optional)"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 bg-white"
          >
            <option value="ROLE_CUSTOMER">Customer</option>
            <option value="ROLE_ADMIN">Admin</option>
            <option value="ROLE_RESTAURANT_OWNER">Restaurant Owner</option>
          </select>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 cursor-pointer"
          >
            Next: Verify Email
          </button>
        </form>
      ) : (
        <form className="space-y-4" onSubmit={handleRegister}>
          <p className="text-sm text-gray-600">Enter the OTP sent to {email}</p>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 cursor-pointer"
          >
            Verify & Register
          </button>

          <button
            type="button"
            onClick={() => setOtpSent(false)}
            className="w-full text-blue-600 mt-2 text-sm hover:underline cursor-pointer"
          >
            Back
          </button>
        </form>
      )}

      {!otpSent && (
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <button
            onClick={onSwitch}
            className="text-orange-600 font-medium cursor-pointer"
          >
            Sign In
          </button>
        </p>
      )}
    </Modal>
  );
};
