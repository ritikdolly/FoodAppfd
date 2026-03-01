import { useState, useCallback } from "react";
import { Modal } from "../ui/Modal";
import { useAuth } from "../../context/AuthContext";
import {
  Mail,
  Key,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { useFormSecurity } from "../../hooks/useFormSecurity";

export const ForgotPasswordModal = ({ open, onClose, onBackToSignIn }) => {
  const { forgotPassword, resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [step, setStep] = useState(1); // 1 = email, 2 = OTP + new password, 3 = success
  const [loading, setLoading] = useState(false);

  // Form security: clear on tab switch / inactivity
  const clearFields = useCallback(() => {
    setEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setStep(1);
  }, []);
  useFormSecurity({ onClear: clearFields, active: open });

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword(email);
      setStep(2);
    } catch (error) {
      console.error("Forgot password error:", error);
      const errorMessage =
        typeof error === "string"
          ? error
          : error?.message || "Failed to send reset code";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email, otp, newPassword);
      setStep(3);
    } catch (error) {
      console.error("Reset password error:", error);
      const errorMessage =
        typeof error === "string"
          ? error
          : error?.message || "Password reset failed";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setStep(1);
    setLoading(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} className="p-0 overflow-hidden">
      <div className="p-8">
        {/* Step 1: Enter Email */}
        {step === 1 && (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-orange-500" />
              </div>
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Forgot Password?
              </h2>
              <p className="text-gray-500">
                No worries! Enter your email and we'll send you a reset code.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSendOtp}>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  required
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3.5 rounded-xl font-medium shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Send Reset Code <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </>
        )}

        {/* Step 2: Enter OTP + New Password */}
        {step === 2 && (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Key className="w-8 h-8 text-orange-500" />
              </div>
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Reset Password
              </h2>
              <p className="text-gray-500">
                Enter the code sent to{" "}
                <span className="font-medium text-gray-700">{email}</span>
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleResetPassword}>
              <div className="relative group">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all tracking-widest text-lg"
                  required
                  maxLength={6}
                  autoFocus
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password (min 6 chars)"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  required
                  minLength={6}
                />
              </div>

              <div className="relative group">
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm New Password"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  required
                  minLength={6}
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={loading}
                  className="flex-1 px-4 py-3.5 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-[2] bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3.5 rounded-xl font-medium shadow-lg shadow-green-500/30 hover:shadow-green-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Reset Password <CheckCircle2 className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Password Reset!
            </h2>
            <p className="text-gray-500 mb-8">
              Your password has been reset successfully. You can now sign in
              with your new password.
            </p>
            <button
              onClick={() => {
                handleClose();
                onBackToSignIn?.();
              }}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3.5 rounded-xl font-medium shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              Back to Sign In <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {step !== 3 && (
        <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
          <p className="text-gray-600">
            Remember your password?{" "}
            <button
              onClick={() => {
                handleClose();
                onBackToSignIn?.();
              }}
              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 hover:opacity-80 transition-opacity cursor-pointer"
            >
              Sign In Here
            </button>
          </p>
        </div>
      )}
    </Modal>
  );
};
