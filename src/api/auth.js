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

export const sendLoginOtp = async (email) => {
  try {
    const response = await client.post("/auth/otp/send", { email });
    return response.data;
  } catch (error) {
    console.error("Send OTP API error:", error);
    throw error.response?.data || error.message;
  }
};

export const loginWithOtp = async (email, otp) => {
  try {
    const response = await client.post("/auth/otp/login", { email, otp });
    return response.data;
  } catch (error) {
    console.error("Login with OTP API error:", error);
    throw error.response?.data || error.message;
  }
};

export const verifyEmail = async (email, otp) => {
  try {
    const response = await client.post("/auth/verify/email", { email, otp });
    return response.data;
  } catch (error) {
    console.error("Verify Email API error:", error);
    throw error.response?.data || error.message;
  }
};

export const loginWithPhone = async (phoneLoginRequest) => {
  try {
    const response = await client.post("/auth/phone/login", phoneLoginRequest);
    return response.data;
  } catch (error) {
    console.error("Phone Login API error:", error);
    throw error.response?.data || error.message;
  }
};
