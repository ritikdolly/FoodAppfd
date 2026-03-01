import { useState, useEffect, useRef, useCallback } from "react";
import { Modal } from "../ui/Modal";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Phone,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useFormSecurity } from "../../hooks/useFormSecurity";

export const SignUpModal = ({ open, onClose, onSwitch }) => {
  const { register, sendRegisterOtp, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const googleBtnRef = useRef(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // Form security: clear on tab switch / inactivity
  const clearFields = useCallback(() => {
    setFullName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
    setOtp("");
    setOtpSent(false);
  }, []);
  useFormSecurity({ onClear: clearFields, active: open });

  const handleAuthRedirect = (role) => {
    if (role === "ROLE_ADMIN") {
      navigate("/auth/admin");
    } else {
      navigate("/");
    }
    onClose();
  };

  // Initialize Google Sign-In button when modal opens
  useEffect(() => {
    if (open && !otpSent && window.google && googleBtnRef.current) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleCallback,
      });
      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: "outline",
        size: "large",
        width: googleBtnRef.current.offsetWidth,
        text: "signup_with",
        shape: "pill",
      });
    }
  }, [open, otpSent]);

  const handleGoogleCallback = async (response) => {
    setLoading(true);
    try {
      const data = await loginWithGoogle(response.credential);
      handleAuthRedirect(data.role);
    } catch (error) {
      console.error("Google signup error:", error);
      const errorMessage =
        typeof error === "string"
          ? error
          : error?.message || "Google signup failed";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendRegisterOtp(email);
      setOtpSent(true);
    } catch (error) {
      console.error("Send OTP error:", error);
      const errorMessage =
        typeof error === "string"
          ? error
          : error?.message || "Failed to send OTP";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // SECURITY: No role is sent — backend always assigns ROLE_CUSTOMER
      await register({ fullName, email, password, phoneNumber, otp });
      alert("Registration Successful!");
      handleClose();
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        typeof error === "string"
          ? error
          : error?.message || "Registration failed";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
    setOtp("");
    setOtpSent(false);
    setLoading(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} className="p-0 overflow-hidden">
      <div className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            {otpSent ? "Verify Email" : "Create Account"}
          </h2>
          <p className="text-gray-500">
            {otpSent
              ? `We've sent a verification code to ${email}`
              : "Join us today and start your journey"}
          </p>
        </div>

        {!otpSent ? (
          <>
            {/* Google Sign-Up Button */}
            <div className="mb-6">
              <div
                ref={googleBtnRef}
                className="w-full flex justify-center"
              ></div>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-400">
                  or sign up with email
                </span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleSendOtp}>
              <div className="space-y-4">
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    required
                  />
                </div>

                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    required
                  />
                </div>

                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    required
                  />
                </div>

                <div className="relative group">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone Number (Optional)"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3.5 rounded-xl font-medium shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Next Step <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <form className="space-y-6" onSubmit={handleRegister}>
            <div className="flex flex-col items-center justify-center py-4">
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-orange-500" />
              </div>
              <p className="text-sm text-gray-500 max-w-[240px] text-center">
                Please check your email inbox and enter the 6-digit verification
                code below.
              </p>
            </div>

            <div className="relative group">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="000000"
                className="w-full text-center text-3xl tracking-[1em] font-bold py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:tracking-widest"
                required
                maxLength={6}
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                disabled={loading}
                className="flex-1 px-4 py-3.5 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-[2] bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3.5 rounded-xl font-medium shadow-lg shadow-green-500/30 hover:shadow-green-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Verify & Create <CheckCircle2 className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
        <p className="text-gray-600">
          Already have an account?{" "}
          <button
            onClick={onSwitch}
            className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 hover:opacity-80 transition-opacity cursor-pointer"
          >
            Sign In Here
          </button>
        </p>
      </div>
    </Modal>
  );
};
