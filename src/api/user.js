import client from "./client";

export const addFavorite = async (userId, foodId) => {
  try {
    const response = await client.post(
      `/api/users/${userId}/favorites/${foodId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error;
  }
};

export const removeFavorite = async (userId, foodId) => {
  try {
    const response = await client.delete(
      `/api/users/${userId}/favorites/${foodId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error;
  }
};

export const getFavorites = async (userId) => {
  try {
    const response = await client.get(`/api/users/${userId}/favorites`);
    return response.data;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
};
