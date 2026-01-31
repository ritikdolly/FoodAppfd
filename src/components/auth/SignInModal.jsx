import { useState } from "react";
import { Modal } from "../ui/Modal";
import { auth } from "../../config/firebase";
import {
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

export const SignInModal = ({ open, onClose, onSwitch }) => {
  const [loginMethod, setLoginMethod] = useState("password"); // 'password' or 'otp'

  // Password State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // OTP State
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "sign-in-recaptcha",
        {
          size: "invisible",
          callback: () => {
            // reCAPTCHA solved
          },
        },
      );
    }
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // alert("Logged in successfully!");
      onClose();
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message);
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
      alert("Logged in successfully!");
      onClose();
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Sign In</h2>

      {/* Toggle Login Method */}
      <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
        <button
          onClick={() => setLoginMethod("password")}
          className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
            loginMethod === "password"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Password
        </button>
        <button
          onClick={() => setLoginMethod("otp")}
          className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
            loginMethod === "otp"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          OTP
        </button>
      </div>

      <form className="space-y-4">
        {loginMethod === "password" ? (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              onClick={handlePasswordLogin}
              className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700"
            >
              Sign In
            </button>
          </>
        ) : (
          /* OTP Login Flow */
          <>
            {!isOtpSent ? (
              <>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone Number (e.g., +91 XXXXXXXXXX)"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
                />
                <div id="sign-in-recaptcha"></div>
                <button
                  onClick={handleSendOtp}
                  className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700"
                >
                  Send OTP
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
          </>
        )}
      </form>

      <p className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <button onClick={onSwitch} className="text-orange-600 font-medium">
          Sign Up
        </button>
      </p>
    </Modal>
  );
};
