import axios from "axios";

// Get base URL from environment or default to localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const createPaymentOrder = async (
  amount,
  currency = "INR",
  receipt = "receipt_1",
) => {
  try {
    const response = await axios.post(
      `${API_URL}/payment/create-order`,
      {
        amount,
        currency,
        receipt,
      },
      {
        headers: getAuthHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const verifyPayment = async (orderId, paymentId, signature) => {
  try {
    const response = await axios.post(
      `${API_URL}/payment/verify`,
      {
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
        razorpay_signature: signature,
      },
      {
        headers: getAuthHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
