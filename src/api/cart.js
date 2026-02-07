import client from "./client";

export const getCart = async () => {
  try {
    const response = await client.get("/api/cart");
    return response.data;
  } catch (error) {
    console.error("Get Cart API error:", error);
    throw error.response?.data || error.message;
  }
};

export const addToCart = async (addCartRequest) => {
  try {
    const response = await client.post("/api/cart/add", addCartRequest);
    return response.data;
  } catch (error) {
    console.error("Add to Cart API error:", error);
    throw error.response?.data || error; // error.response.data might be string
  }
};

export const updateItemQuantity = async (foodId, quantity) => {
  try {
    const response = await client.put(`/api/cart/item/${foodId}`, { quantity });
    return response.data;
  } catch (error) {
    console.error("Update Item Quantity API error:", error);
    throw error.response?.data || error.message;
  }
};

export const removeItem = async (foodId) => {
  try {
    const response = await client.delete(`/api/cart/item/${foodId}`);
    return response.data;
  } catch (error) {
    console.error("Remove Item API error:", error);
    throw error.response?.data || error.message;
  }
};

export const clearCart = async () => {
  try {
    const response = await client.put("/api/cart/clear");
    return response.data;
  } catch (error) {
    console.error("Clear Cart API error:", error);
    throw error.response?.data || error.message;
  }
};
