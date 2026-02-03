import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signOut,
  onAuthStateChanged,
  RecaptchaVerifier,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { Loading } from "../common/Loading";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState("ROLE_CUSTOMER");
  const [loading, setLoading] = useState(true);
  const [confirmationResult, setConfirmationResult] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Sync with backend
        try {
          const token = await user.getIdToken();
          localStorage.setItem("jwt", token);

          const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          });

          if (response.ok) {
            const data = await response.json();
            setCurrentUser(user); // Firebase User still useful for client SDK

            // Prefer backend data for app state
            if (data.jwt) {
              localStorage.setItem("jwt", data.jwt);
            }
            if (data.user) {
              localStorage.setItem("user", JSON.stringify(data.user));
              setUserRole(data.user.role || "CUSTOMER");
            }
          } else {
            console.error("Backend sync failed");
            // Handle failure? Logout?
          }
        } catch (error) {
          console.error("Backend sync error", error);
        }
      } else {
        setCurrentUser(null);
        setUserRole("CUSTOMER");
        localStorage.removeItem("user");
        localStorage.removeItem("jwt");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      // 1. Create User in Firebase (Email/Password)
      const { email, password, role, fullName, phoneNumber } = userData;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // 2. Call Backend Register
      const token = await user.getIdToken();
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          fullName,
          email,
          role,
          phoneNumber, // Optional if provided
        }),
      });

      if (!response.ok) {
        throw new Error("Backend registration failed");
      }

      const data = await response.json();

      // Update local storage
      if (data.jwt) localStorage.setItem("jwt", data.jwt);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUserRole(data.user.role);
        setCurrentUser(user);
      }

      return data;
    } catch (error) {
      // If backend fails, maybe delete firebase user?
      // For now just throw
      throw error;
    }
  };

  const setupRecaptcha = (elementId) => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, elementId, {
        size: "invisible",
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      });
    }
  };

  const sendOtp = async (phoneNumber) => {
    try {
      // Ensure recaptcha is set up in the UI component before calling this
      // OR pass the element ID to this function.
      // Ideally, setupRecaptcha is called in the component.
      // Here we assume window.recaptchaVerifier is ready.

      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) throw new Error("Recaptcha not initialized");

      const result = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier,
      );
      setConfirmationResult(result);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const verifyOtpLogin = async (otp) => {
    if (!confirmationResult) throw new Error("No OTP sent");
    try {
      const result = await confirmationResult.confirm(otp);
      return result.user;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const value = {
    currentUser,
    userRole,
    login,
    register,
    sendOtp,
    verifyOtpLogin,
    logout,
    loading,
    setupRecaptcha,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <Loading />}
    </AuthContext.Provider>
  );
};
