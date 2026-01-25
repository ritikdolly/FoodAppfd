import client from "./client";

export const addAddress = async (addressData) => {
  try {
    const response = await client.post("/api/address", addressData);
    return response.data;
  } catch (error) {
    console.error("Error adding address:", error);
    throw error;
  }
};

export const getAddresses = async () => {
  try {
    const response = await client.get("/api/address");
    return response.data;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    throw error;
  }
};

export const updateAddress = async (id, addressData) => {
  try {
    const response = await client.put(`/api/address/${id}`, addressData);
    return response.data;
  } catch (error) {
    console.error("Error updating address:", error);
    throw error;
  }
};

export const deleteAddress = async (id) => {
  try {
    const response = await client.delete(`/api/address/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting address:", error);
    throw error;
  }
};
