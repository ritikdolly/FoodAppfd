import { createContext, useContext, useEffect, useState } from "react";
import { Loading } from "../common/Loading";
import {
  login as apiLogin,
  register as apiRegister,
  sendRegisterOtp as apiSendRegisterOtp,
  sendLoginOtp as apiSendLoginOtp,
  loginWithOtp as apiLoginWithOtp,
  verifyEmail as apiVerifyEmail,
  loginWithGoogle as apiLoginWithGoogle,
  forgotPassword as apiForgotPassword,
  resetPassword as apiResetPassword,
} from "../api/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auth modal state (shared across all components)
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const openSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };
  const openSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };
  const closeAuthModals = () => {
    setShowSignIn(false);
    setShowSignUp(false);
  };

  const getUserFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      // Check for expiration
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        localStorage.removeItem("jwt");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        localStorage.removeItem("user");
        return null;
      }

      return { email: payload.sub };
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      // Check local storage for existing session
      const jwt = localStorage.getItem("jwt");
      const role = localStorage.getItem("role");
      const userId = localStorage.getItem("userId");

      if (jwt) {
        const userFromToken = getUserFromToken(jwt);

        // If token is invalid or expired (returns null), stop here
        if (!userFromToken) {
          setLoading(false);
          return;
        }

        setUserRole(role || "ROLE_CUSTOMER");

        let baseUser = {
          role: role || "ROLE_CUSTOMER",
          id: userId,
          ...userFromToken,
        };

        // Fetch full profile if we have an ID
        if (userId) {
          try {
            // Dynamic import to avoid circular dependency
            const { getUser } = await import("../api/user");
            const fullUser = await getUser(userId);
            setCurrentUser({ ...baseUser, ...fullUser });
          } catch (err) {
            console.error("Failed to fetch user profile", err);
            setCurrentUser(baseUser);
          }
        } else {
          setCurrentUser(baseUser);
        }
      }
      setLoading(false);
    };
    initAuth();
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

  const sendRegisterOtp = async (email) => {
    return await apiSendRegisterOtp(email);
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

  const loginWithGoogle = async (googleToken) => {
    const data = await apiLoginWithGoogle(googleToken);
    handleAuthSuccess(data);
    return data;
  };

  const forgotPassword = async (email) => {
    return await apiForgotPassword(email);
  };

  const resetPassword = async (email, otp, newPassword) => {
    return await apiResetPassword(email, otp, newPassword);
  };

  const handleAuthSuccess = async (data) => {
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("role", data.role);
      if (data.userId) {
        localStorage.setItem("userId", data.userId);
      }

      const userFromToken = getUserFromToken(data.jwt);
      let userObj = {
        ...userFromToken,
        role: data.role,
        id: data.userId,
      };

      // Fetch full profile immediately
      if (data.userId) {
        try {
          const { getUser } = await import("../api/user");
          const fullUser = await getUser(data.userId);
          userObj = { ...userObj, ...fullUser };
        } catch (error) {
          console.error("Failed to fetch user profile on login", error);
        }
      }

      // Minimal user object storage if needed, mainly for role persistence if we don't decode on load
      localStorage.setItem("user", JSON.stringify(userObj));

      setCurrentUser(userObj);
      setUserRole(data.role);
    }
  };

  const logout = async () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    setCurrentUser(null);
    setUserRole(null);
  };

  const value = {
    currentUser,
    userRole,
    login,
    register,
    sendRegisterOtp,
    verifyEmail,
    sendLoginOtp,
    loginWithOtp,
    loginWithGoogle,
    forgotPassword,
    resetPassword,
    logout,
    loading,
    showSignIn,
    showSignUp,
    openSignIn,
    openSignUp,
    closeAuthModals,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <Loading />}
    </AuthContext.Provider>
  );
};
