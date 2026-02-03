import { useState, useEffect } from "react";
import { Modal } from "../ui/Modal";
import { useAuth } from "../../context/AuthContext";

export const SignUpModal = ({ open, onClose, onSwitch }) => {
  const { register, sendOtp, verifyOtpLogin, setupRecaptcha } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("CUSTOMER");

  const [isOtpSignup, setIsOtpSignup] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState(null);

  useEffect(() => {
    if (open && isOtpSignup && !otpSent) {
      // Initialize recaptcha if in OTP mode
      try {
        setupRecaptcha("signup-recaptcha-container");
      } catch (e) {
        // already initialized potentially
      }
    }
  }, [open, isOtpSignup, otpSent, setupRecaptcha]);

  const handleSendOtp = async () => {
    try {
      await sendOtp(phoneNumber);
      setOtpSent(true);
      alert("OTP Sent!");
    } catch (e) {
      console.error("Send OTP Error", e);
      alert("Failed to send OTP: " + e.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const user = await verifyOtpLogin(otp);
      setFirebaseUser(user);
      setOtpVerified(true);
      alert("OTP Verified! Please complete registration details.");
    } catch (e) {
      console.error("Verify OTP Error", e);
      alert("Invalid OTP");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if (isOtpSignup) {
        if (!otpVerified || !firebaseUser) {
          alert("Please verify OTP first");
          return;
        }
        // Call backend register directly since we have the firebase user/token
        const token = await firebaseUser.getIdToken();
        const response = await fetch(
          "http://localhost:8080/api/auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              token,
              fullName,
              email, // Optional for phone signup
              role,
              phoneNumber,
            }),
          },
        );

        if (!response.ok) throw new Error("Backend registration failed");

        const data = await response.json();
        if (data.jwt) localStorage.setItem("jwt", data.jwt);
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

        alert("Registration Successful!");
        onClose();
      } else {
        // Email/Password Signup
        await register({ fullName, email, password, phoneNumber, role });
        alert("Registration Successful!");
        onClose();
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.message || "Registration failed");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">
        {isOtpSignup ? "Sign Up with Phone" : "Create Account"}
      </h2>

      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-1 rounded-l-lg ${!isOtpSignup ? "bg-orange-600 text-white" : "bg-gray-200"}`}
          onClick={() => setIsOtpSignup(false)}
        >
          Email
        </button>
        <button
          className={`px-4 py-1 rounded-r-lg ${isOtpSignup ? "bg-orange-600 text-white" : "bg-gray-200"}`}
          onClick={() => setIsOtpSignup(true)}
        >
          Phone
        </button>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
        />

        {!isOtpSignup && (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
            />
          </>
        )}

        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
        />

        {isOtpSignup && (
          <>
            {!otpSent ? (
              <button
                type="button"
                onClick={handleSendOtp}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Send OTP
              </button>
            ) : (
              <>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
                />
                {!otpVerified && (
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                  >
                    Verify OTP
                  </button>
                )}
              </>
            )}
            <div id="signup-recaptcha-container"></div>
          </>
        )}

        {/* Role Selection */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 bg-white"
        >
          <option value="ROLE_CUSTOMER">Customer</option>
          <option value="ROLE_ADMIN">Admin</option>
          <option value="ROLE_RESTAURANT_OWNER">Restaurant Owner</option>
        </select>

        {(!isOtpSignup || otpVerified) && (
          <button
            onClick={handleSignUp}
            className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700"
          >
            Sign Up
          </button>
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
