import client from "./client";

export const createPaymentLink = async (orderId) => {
  const response = await client.post(`/api/payment/${orderId}`);
  return response.data;
};

export const verifyPayment = async (paymentData) => {
  const response = await client.put("/api/payment/verify", paymentData);
  return response.data;
};
