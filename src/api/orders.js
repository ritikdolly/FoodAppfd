import client from "./client";

export const createOrder = async (orderData) => {
  const response = await client.post("/api/order", orderData);
  return response.data;
};

export const getUserOrders = async () => {
  const response = await client.get("/api/order/user");
  return response.data;
};

export const getAllOrders = async () => {
  const response = await client.get("/api/admin/order");
  return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await client.put(`/api/admin/order/${orderId}/${status}`);
  return response.data;
};
