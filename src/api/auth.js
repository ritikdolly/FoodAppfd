import client from "./client";

export const login = async (email, password) => {
  try {
    const response = await client.post("/auth/signin", { email, password });
    return response.data;
  } catch (error) {
    console.error("Login API error:", error);
    throw error.response?.data || error.message;
  }
};

export const register = async (userData) => {
  try {
    const response = await client.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    console.error("Register API error:", error);
    throw error.response?.data || error.message;
  }
};

export const sendOtp = async (email) => {
  try {
    const response = await client.post("/auth/send-otp", { email });
    return response.data;
  } catch (error) {
    console.error("Send OTP API error:", error);
    throw error.response?.data || error.message;
  }
};

export const verifyOtp = async (email, otp) => {
  try {
    const response = await client.post("/auth/verify-otp", { email, otp });
    return response.data;
  } catch (error) {
    console.error("Verify OTP API error:", error);
    throw error.response?.data || error.message;
  }
};
