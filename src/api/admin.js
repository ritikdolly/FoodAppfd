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
