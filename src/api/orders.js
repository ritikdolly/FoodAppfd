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

export const getOrderInvoice = async (orderId) => {
  const response = await client.get(`/api/admin/orders/${orderId}/invoice`);
  return response.data;
};

export const getOrderById = async (orderId) => {
  const response = await client.get(`/api/order/${orderId}`);
  return response.data;
};

export const confirmOrder = async (orderId, orderRequest) => {
  const response = await client.put(
    `/api/order/${orderId}/confirm`,
    orderRequest,
  );
  return response.data;
};

export const initiatePaymentForOrder = async (orderId) => {
  const response = await client.post(`/api/payment/initiate/${orderId}`);
  return response.data;
};
