import client from "./client";

export const createUser = async (userData) => {
  try {
    const response = await client.post("/api/admin/users", userData);
    return response.data;
  } catch (error) {
    console.error("Create User API error:", error);
    throw error.response?.data || error.message;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await client.get("/api/admin/users");
    return response.data;
  } catch (error) {
    console.error("Get Users API error:", error);
    throw error.response?.data || error.message;
  }
};

export const searchUsers = async (keyword = "", page = 0, size = 10) => {
  try {
    const response = await client.get("/api/admin/users/search", {
      params: { keyword, page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Search Users API error:", error);
    throw error.response?.data || error.message;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await client.put(`/api/admin/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Update User API error:", error);
    throw error.response?.data || error.message;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await client.delete(`/api/admin/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete User API error:", error);
    throw error.response?.data || error.message;
  }
};
