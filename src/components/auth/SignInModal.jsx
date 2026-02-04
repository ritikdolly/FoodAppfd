import { useState, useEffect } from "react";
import { Modal } from "../ui/Modal";
import { useAuth } from "../../context/AuthContext";

export const SignInModal = ({ open, onClose, onSwitch }) => {
  const { login, sendPhoneOtp, verifyPhoneOtp, setupRecaptcha } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpLogin, setIsOtpLogin] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    if (open && isOtpLogin) {
      try {
        setupRecaptcha("recaptcha-container");
      } catch (e) {
        // e.g. already rendered
      }
    }
  }, [open, isOtpLogin, setupRecaptcha]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (isOtpLogin) {
        await verifyPhoneOtp(otp);
      } else {
        await login(email, password);
      }
      onClose();
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message || "Login failed");
    }
  };

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      alert("Please enter your phone number first");
      return;
    }
    let formattedNumber = phoneNumber.trim();
    if (!formattedNumber.startsWith("+")) {
      formattedNumber = "+91" + formattedNumber;
    }
    try {
      await sendPhoneOtp(formattedNumber);
      setOtpSent(true);
      alert("OTP sent to your phone");
      setPhoneNumber(formattedNumber); // Update state to keep consistent
    } catch (error) {
      console.error("Send OTP error:", error);
      alert(error.message || "Failed to send OTP");
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setOtp("");
    setPhoneNumber("");
    setIsOtpLogin(false);
    setOtpSent(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={resetForm}>
      <h2 className="text-xl font-semibold mb-4">
        {isOtpLogin ? "Sign In with Phone" : "Sign In"}
      </h2>

      <form className="space-y-4" onSubmit={handleLogin}>
        {!isOtpLogin && (
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        )}

        {isOtpLogin && !otpSent && (
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number (e.g. +1...)"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        )}

        {isOtpLogin ? (
          <>
            {otpSent && (
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            )}
            {!otpSent && (
              <>
                <div id="recaptcha-container"></div>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mb-2 mt-2"
                >
                  Send OTP
                </button>
              </>
            )}
          </>
        ) : (
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        )}

        {(!isOtpLogin || otpSent) && (
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700"
          >
            Sign In
          </button>
        )}
      </form>

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => {
            setIsOtpLogin(!isOtpLogin);
            setOtpSent(false);
            setOtp("");
            setPhoneNumber("");
            setPassword("");
            setEmail("");
          }}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          {isOtpLogin ? "Login with Password" : "Login with Phone OTP"}
        </button>
      </div>

      <p className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <button onClick={onSwitch} className="text-orange-600 font-medium">
          Sign Up
        </button>
      </p>
    </Modal>
  );
};
