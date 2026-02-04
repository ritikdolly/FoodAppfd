import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithPhoneNumber,
  signOut,
  RecaptchaVerifier,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { Loading } from "../common/Loading";
import {
  login as apiLogin,
  register as apiRegister,
  sendLoginOtp as apiSendLoginOtp,
  loginWithOtp as apiLoginWithOtp,
  verifyEmail as apiVerifyEmail,
  loginWithPhone as apiLoginWithPhone,
} from "../api/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmationResult, setConfirmationResult] = useState(null);

  const getUserFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return { email: payload.sub };
    } catch {
      return null;
    }
  };

  useEffect(() => {
    // Check local storage for existing session
    const jwt = localStorage.getItem("jwt");
    const role = localStorage.getItem("role");

    if (jwt) {
      const userFromToken = getUserFromToken(jwt);
      setUserRole(role || "ROLE_CUSTOMER");

      if (userFromToken) {
        setCurrentUser({ ...userFromToken, role: role || "ROLE_CUSTOMER" });
      } else {
        setCurrentUser({ role: role || "ROLE_CUSTOMER" });
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await apiLogin(email, password);
    handleAuthSuccess(data);
    return data;
  };

  const register = async (userData) => {
    const data = await apiRegister(userData);
    return data;
  };

  const verifyEmail = async (email, otp) => {
    const data = await apiVerifyEmail(email, otp);
    handleAuthSuccess(data);
    return data;
  };

  const sendLoginOtp = async (email) => {
    return await apiSendLoginOtp(email);
  };

  const loginWithOtp = async (email, otp) => {
    const data = await apiLoginWithOtp(email, otp);
    handleAuthSuccess(data);
    return data;
  };

  const loginWithPhone = async (phoneLoginRequest) => {
    const data = await apiLoginWithPhone(phoneLoginRequest);
    handleAuthSuccess(data);
    return data;
  };

  const handleAuthSuccess = (data) => {
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("role", data.role);

      const userFromToken = getUserFromToken(data.jwt);
      const userObj = {
        ...userFromToken,
        role: data.role,
      };
      // Minimal user object storage if needed, mainly for role persistence if we don't decode on load
      localStorage.setItem("user", JSON.stringify(userObj));

      setCurrentUser(userObj);
      setUserRole(data.role);
    }
  };

  // Firebase Phone Auth Helpers
  const setupRecaptcha = (elementId) => {
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (e) {
        console.warn("Retrying recaptcha clear", e);
      }
      window.recaptchaVerifier = null;
    }

    window.recaptchaVerifier = new RecaptchaVerifier(auth, elementId, {
      size: "invisible",
      callback: () => {
        // reCAPTCHA solved
      },
      "expired-callback": () => {
        // Response expired. Ask user to solve reCAPTCHA again.
      },
    });
  };

  const sendPhoneOtp = async (phoneNumber) => {
    const appVerifier = window.recaptchaVerifier;
    if (!appVerifier) throw new Error("Recaptcha not initialized");

    const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    setConfirmationResult(result);
    return result;
  };

  const verifyPhoneOtp = async (otp) => {
    if (!confirmationResult) throw new Error("No VM sent"); // Verification Method/OTP
    const result = await confirmationResult.confirm(otp);
    const firebaseUser = result.user;
    const token = await firebaseUser.getIdToken();

    // Now call backend to sync/login
    return await loginWithPhone({ token });
  };

  const logout = async () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setCurrentUser(null);
    setUserRole(null);
    try {
      await signOut(auth); // Clear firebase session if any
    } catch (e) {
      console.error(e);
    }
  };

  const value = {
    currentUser,
    userRole,
    login,
    register,
    verifyEmail,
    sendLoginOtp,
    loginWithOtp,
    setupRecaptcha,
    sendPhoneOtp, // Renamed from sendOtp to avoid confusion with Email OTP
    verifyPhoneOtp, // Renamed verifyOtpLogin -> verifyPhoneOtp
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <Loading />}
    </AuthContext.Provider>
  );
};
