import client from "./client";

export const initiatePayment = async () => {
  const response = await client.post("/api/payment/initiate");
  return response.data;
};

export const verifyPayment = async (paymentData) => {
  const response = await client.put("/api/payment/verify", paymentData);
  return response.data;
};
