import client from "./client";

export const createPaymentOrder = async (amount) => {
  try {
    const response = await client.post("/api/payment/create_order", { amount });
    return response.data;
  } catch (error) {
    console.error("Error creating payment order:", error);
    throw error;
  }
};
