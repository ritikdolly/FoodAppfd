import { useState } from "react";
import { Modal } from "../ui/Modal";
import { useAuth } from "../../context/AuthContext";

export const SignInModal = ({ open, onClose, onSwitch }) => {
  const { login, sendLoginOtp, loginWithOtp } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isOtpLogin, setIsOtpLogin] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (isOtpLogin) {
        if (!otpSent) {
          await sendLoginOtp(email);
          setOtpSent(true);
          alert(`OTP sent to ${email}`);
        } else {
          await loginWithOtp(email, otp);
          onClose();
        }
      } else {
        await login(email, password);
        onClose();
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        typeof error === "string" ? error : error?.message || "Login failed";
      alert(errorMessage);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setOtp("");
    setIsOtpLogin(false);
    setOtpSent(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={resetForm}>
      <h2 className="text-xl font-semibold mb-4">
        {isOtpLogin ? "Sign In with OTP" : "Sign In"}
      </h2>

      <form className="space-y-4" onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />

        {!isOtpLogin && (
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        )}

        {isOtpLogin && otpSent && (
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        )}

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 cursor-pointer"
        >
          {isOtpLogin ? (otpSent ? "Verify & Login" : "Send OTP") : "Sign In"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => {
            setIsOtpLogin(!isOtpLogin);
            setOtpSent(false);
            setOtp("");
          }}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
        >
          {isOtpLogin ? "Login with Password" : "Login with OTP"}
        </button>
      </div>

      <p className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <button
          onClick={onSwitch}
          className="text-orange-600 font-medium cursor-pointer"
        >
          Sign Up
        </button>
      </p>
    </Modal>
  );
};
