import { useState } from "react";
import { Modal } from "../ui/Modal";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Key, ArrowRight, Loader2 } from "lucide-react";

export const SignInModal = ({ open, onClose, onSwitch }) => {
  const { login, sendLoginOtp, loginWithOtp } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isOtpLogin, setIsOtpLogin] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuthRedirect = (role) => {
    if (role === "ROLE_ADMIN") {
      navigate("/auth/admin");
    } else {
      navigate("/");
    }
    onClose();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isOtpLogin) {
        if (!otpSent) {
          await sendLoginOtp(email);
          setOtpSent(true);
        } else {
          const data = await loginWithOtp(email, otp);
          handleAuthRedirect(data.role);
        }
      } else {
        const data = await login(email, password);
        handleAuthRedirect(data.role);
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        typeof error === "string" ? error : error?.message || "Login failed";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setOtp("");
    setIsOtpLogin(false);
    setOtpSent(false);
    setLoading(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={resetForm} className="p-0 overflow-hidden">
      <div className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            {isOtpLogin ? "Welcome Back" : "Welcome Back"}
          </h2>
          <p className="text-gray-500">
            {isOtpLogin
              ? otpSent
                ? `Enter the code sent to ${email}`
                : "Sign in with your email using OTP"
              : "Sign in to continue to your account"}
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                required
                disabled={otpSent && isOtpLogin}
              />
            </div>

            {!isOtpLogin && (
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
            )}

            {isOtpLogin && otpSent && (
              <div className="relative group animate-in slide-in-from-bottom-2 fade-in duration-300">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all tracking-widest text-lg"
                  required
                  maxLength={6}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3.5 rounded-xl font-medium shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                {isOtpLogin
                  ? otpSent
                    ? "Verify & Login"
                    : "Send OTP"
                  : "Sign In"}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setIsOtpLogin(!isOtpLogin);
              setOtpSent(false);
              setOtp("");
            }}
            className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors"
          >
            {isOtpLogin ? "Use Password" : "Use One-Time Password"}
          </button>

          {!isOtpLogin && (
            <button
              type="button"
              className="text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors"
            >
              Forgot Password?
            </button>
          )}
        </div>
      </div>

      <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
        <p className="text-gray-600">
          Don’t have an account?{" "}
          <button
            onClick={onSwitch}
            className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 hover:opacity-80 transition-opacity"
          >
            Sign Up Now
          </button>
        </p>
      </div>
    </Modal>
  );
};
