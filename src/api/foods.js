import client from "./client";

export const getAllFoods = async () => {
  try {
    const response = await client.get("/api/foods");
    return response.data;
  } catch (error) {
    console.error("Error fetching foods:", error);
    throw error;
  }
};

export const getFoodById = async (id) => {
  try {
    const response = await client.get(`/api/foods/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching food by id:", error);
    throw error;
  }
};

export const createFood = async (foodData) => {
  try {
    const response = await client.post("/api/foods/add", foodData);
    return response.data;
  } catch (error) {
    console.error("Error creating food:", error);
    throw error;
  }
};

export const updateFood = async (id, foodData) => {
  if (!id) {
    console.error("Error: Cannot update food with missing ID");
    return;
  }
  try {
    const response = await client.put(`/api/foods/${id}`, foodData);
    return response.data;
  } catch (error) {
    console.error("Error updating food:", error);
    throw error;
  }
};

export const deleteFood = async (id) => {
  if (!id) {
    console.error("Error: Cannot delete food with missing ID");
    return;
  }
  try {
    const response = await client.delete(`/api/foods/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting food:", error);
    throw error;
  }
};

export const addReview = async (foodId, reviewData) => {
  try {
    const response = await client.post(
      `/api/foods/${foodId}/reviews`,
      reviewData,
    );
    return response.data;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

export const deleteReview = async (foodId, reviewId) => {
  try {
    const response = await client.delete(
      `/api/foods/${foodId}/reviews/${reviewId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};

export const buyNow = async (buyNowRequest) => {
  try {
    const response = await client.post("/api/order/buy-now", buyNowRequest);
    return response.data;
  } catch (error) {
    console.error("Error creating buy now order:", error);
    throw error;
  }
};
