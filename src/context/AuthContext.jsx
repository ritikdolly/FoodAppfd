import { createContext, useContext, useEffect, useState } from "react";
import { Loading } from "../common/Loading";
import {
  login as apiLogin,
  register as apiRegister,
  sendRegisterOtp as apiSendRegisterOtp,
  sendLoginOtp as apiSendLoginOtp,
  loginWithOtp as apiLoginWithOtp,
  verifyEmail as apiVerifyEmail,
} from "../api/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

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
    const userId = localStorage.getItem("userId");

    if (jwt) {
      const userFromToken = getUserFromToken(jwt);
      setUserRole(role || "ROLE_CUSTOMER");

      if (userFromToken) {
        setCurrentUser({
          ...userFromToken,
          role: role || "ROLE_CUSTOMER",
          id: userId,
        });
      } else {
        setCurrentUser({ role: role || "ROLE_CUSTOMER", id: userId });
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

  const handleAuthSuccess = (data) => {
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("role", data.role);
      if (data.userId) {
        localStorage.setItem("userId", data.userId);
      }

      const userFromToken = getUserFromToken(data.jwt);
      const userObj = {
        ...userFromToken,
        role: data.role,
        id: data.userId,
      };
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
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <Loading />}
    </AuthContext.Provider>
  );
};
