import client from "./client";

// Create a new delivery man (Admin only)
export const createDeliveryMan = async (deliveryManData) => {
  const response = await client.post(
    "/api/admin/delivery-men",
    deliveryManData,
  );
  return response.data;
};

// Update delivery man details (Admin only)
export const updateDeliveryMan = async (id, deliveryManData) => {
  const response = await client.put(
    `/api/admin/delivery-men/${id}`,
    deliveryManData,
  );
  return response.data;
};

// Delete delivery man (Admin only)
export const deleteDeliveryMan = async (id) => {
  const response = await client.delete(`/api/admin/delivery-men/${id}`);
  return response.data;
};

// Get delivery man by ID (Admin only)
export const getDeliveryManById = async (id) => {
  const response = await client.get(`/api/admin/delivery-men/${id}`);
  return response.data;
};

// Get all delivery men (Admin only)
export const getAllDeliveryMen = async () => {
  const response = await client.get("/api/admin/delivery-men");
  return response.data;
};

// Get available delivery men (Admin only)
export const getAvailableDeliveryMen = async () => {
  const response = await client.get("/api/admin/delivery-men/available");
  return response.data;
};

// Update delivery man availability status (Admin only)
export const updateDeliveryManStatus = async (id, status) => {
  const response = await client.put(
    `/api/admin/delivery-men/${id}/status`,
    null,
    {
      params: { status },
    },
  );
  return response.data;
};
