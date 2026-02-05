import client from "./client";

export const getFavorites = async (userId) => {
  const response = await client.get(`/api/users/${userId}/favorites`);
  return response.data;
};

export const addFavorite = async (userId, foodId) => {
  const response = await client.post(
    `/api/users/${userId}/favorites/${foodId}`,
  );
  return response.data;
};

export const removeFavorite = async (userId, foodId) => {
  const response = await client.delete(
    `/api/users/${userId}/favorites/${foodId}`,
  );
  return response.data;
};

export const getUser = async (userId) => {
  const response = await client.get(`/api/users/${userId}`);
  return response.data;
};

export const updateUser = async (userId, userData) => {
  const response = await client.put(`/api/users/${userId}`, userData);
  return response.data;
};
