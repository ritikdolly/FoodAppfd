import client from "./client";

export const createOrder = async (orderData) => {
  const response = await client.post("/api/orders/add", orderData);
  return response.data;
};

export const getUserOrders = async (userId) => {
  const response = await client.get(`/api/orders/user/${userId}`);
  return response.data;
};
