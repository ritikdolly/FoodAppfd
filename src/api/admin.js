import client from "./client";

export const getDashboardStats = async (period = "all") => {
  try {
    const response = await client.get(`/api/dashboard/stats?period=${period}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
};

export const fetchAdminOrders = async () => {
  const response = await client.get("/api/admin/orders");
  return response.data;
};

export const fetchAdminOrderById = async (id) => {
  const response = await client.get(`/api/admin/orders/${id}`);
  return response.data;
};

export const updateAdminOrderStatus = async (id, status) => {
  const response = await client.put(`/api/admin/orders/${id}/status`, {
    status,
  });
  return response.data;
};

export const fetchAdminReviews = async () => {
  const response = await client.get("/api/admin/reviews");
  return response.data;
};

export const deleteAdminReview = async (id) => {
  await client.delete(`/api/admin/reviews/${id}`);
};
