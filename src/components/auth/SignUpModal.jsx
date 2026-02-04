import { useState, useEffect } from "react";
import { Modal } from "../ui/Modal";
import { useAuth } from "../../context/AuthContext";

export const SignUpModal = ({ open, onClose, onSwitch }) => {
  const {
    register,
    sendPhoneOtp,
    verifyPhoneOtp,
    setupRecaptcha,
    verifyEmail,
  } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("CUSTOMER");

  const [isOtpSignup, setIsOtpSignup] = useState(false);
  const [otp, setOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState(""); // For email verification
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [showEmailVerify, setShowEmailVerify] = useState(false); // New state for email verification

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
    let formattedNumber = phoneNumber.trim();
    if (!formattedNumber.startsWith("+")) {
      formattedNumber = "+91" + formattedNumber;
    }
    try {
      await sendPhoneOtp(formattedNumber);
      setOtpSent(true);
      alert("OTP Sent!");
      // Update the state so subsequent verify calls use the formatted number if needed,
      // though verifyPhoneOtp uses the global 'confirmationResult' which doesn't depend on the phone number string explicitly.
      setPhoneNumber(formattedNumber);
    } catch (e) {
      console.error("Send OTP Error", e);
      alert("Failed to send OTP: " + e.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const user = await verifyPhoneOtp(otp);
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
        // Phone signup logic (Assuming backend handles phone signup similarly)
        const token = await firebaseUser.getIdToken();
        // Register using context function which calls backend
        // We pass token to backend register endpoint
        await register({
          token,
          fullName,
          email,
          role,
          phoneNumber,
        });

        alert("Registration Successful!");
        onClose();
      } else {
        // Email/Password Signup
        await register({ fullName, email, password, phoneNumber, role });
        // Backend sends OTP to email
        setShowEmailVerify(true);
        alert("Registration Successful! Please check your email for OTP.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.message || "Registration failed");
    }
  };

  const handleEmailVerify = async (e) => {
    e.preventDefault();
    try {
      await verifyEmail(email, emailOtp);
      alert("Email Verified & Login Successful!");
      onClose();
    } catch (error) {
      console.error("Verification error:", error);
      alert(error.message || "Verification failed");
    }
  };

  // Reset form when modal closes
  const handleClose = () => {
    // Reset all states
    setFullName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
    setRole("CUSTOMER");
    setIsOtpSignup(false);
    setOtp("");
    setEmailOtp("");
    setOtpSent(false);
    setOtpVerified(false);
    setFirebaseUser(null);
    setShowEmailVerify(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <h2 className="text-xl font-semibold mb-4">
        {showEmailVerify
          ? "Verify Email"
          : isOtpSignup
            ? "Sign Up with Phone"
            : "Create Account"}
      </h2>

      {!showEmailVerify && (
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
      )}

      {showEmailVerify ? (
        <form className="space-y-4" onSubmit={handleEmailVerify}>
          <p className="text-sm text-gray-600">Enter the OTP sent to {email}</p>
          <input
            type="text"
            value={emailOtp}
            onChange={(e) => setEmailOtp(e.target.value)}
            placeholder="Enter Email OTP"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Verify Email & Login
          </button>
        </form>
      ) : (
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
      )}

      {!showEmailVerify && (
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <button onClick={onSwitch} className="text-orange-600 font-medium">
            Sign In
          </button>
        </p>
      )}
    </Modal>
  );
};
