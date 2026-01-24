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
  try {
    const response = await client.put(`/api/foods/${id}`, foodData);
    return response.data;
  } catch (error) {
    console.error("Error updating food:", error);
    throw error;
  }
};

export const deleteFood = async (id) => {
  try {
    const response = await client.delete(`/api/foods/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting food:", error);
    throw error;
  }
};
