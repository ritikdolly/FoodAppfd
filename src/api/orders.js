import client from "./client";

export const createOrder = async (orderData) => {
  try {
    const response = await client.post("/api/orders/add", orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await client.get("/api/orders");
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
