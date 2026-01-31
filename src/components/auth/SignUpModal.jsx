import { useState } from "react";
import { Modal } from "../ui/Modal";
import { auth } from "../../config/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export const SignUpModal = ({ open, onClose, onSwitch }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          },
        },
      );
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      alert("Please enter a phone number");
      return;
    }

    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier,
      );
      setConfirmationResult(confirmation);
      setIsOtpSent(true);
      alert("OTP Sent Successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert(error.message);
      // Reset recaptcha in case of error so user can try again
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return;

    try {
      await confirmationResult.confirm(otp);
      alert("Phone Number Verified Successfully!");
      // Here you would typically proceed with creating the user account in your backend
      onClose();
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">
        {isOtpSent ? "Verify Phone Number" : "Create Account"}
      </h2>

      <form className="space-y-4">
        {!isOtpSent ? (
          <>
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
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number (e.g., +91 XXXXXXXXXX)"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
            />
            <div id="recaptcha-container"></div>
            <button
              onClick={handleSendOtp}
              className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700"
            >
              Sign Up & Verify Phone
            </button>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-2">
              Enter the OTP sent to {phoneNumber}
            </p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Verify OTP
            </button>
          </>
        )}
      </form>

      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <button onClick={onSwitch} className="text-orange-600 font-medium">
          Sign In
        </button>
      </p>
    </Modal>
  );
};
