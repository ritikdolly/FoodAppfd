import axios from "axios";

const API_URL = "http://localhost:5454/api/customer-reviews";

export const createCustomerReview = async (reviewData) => {
  const token = localStorage.getItem("jwt");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, reviewData, config);
  return response.data;
};

export const getAllCustomerReviews = async () => {
  // Public endpoint typically, but if secured, add token
  const response = await axios.get(API_URL);
  return response.data;
};

export const deleteCustomerReview = async (id) => {
  const token = localStorage.getItem("jwt");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};
