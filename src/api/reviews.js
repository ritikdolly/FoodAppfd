import axios from "axios";

// Access the API URL correctly
const API_URL = "http://localhost:8080/api/customer-reviews";

const getAuthToken = () => localStorage.getItem("jwt");

const getAuthHeader = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getReviews = async () => {
  try {
    const response = await axios.get(API_URL);
    if (response.data.success) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching reviews", error);
    return [];
  }
};

export const deleteReview = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: getAuthHeader(),
    });
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error.response?.data?.message || error.message || "An error occurred";
  }
};

// Assuming backend supports toggling trusted or similar logic,
// if not, we might need to remove this or implement it in backend.
// For now, removing mock logic but keeping function signature if used.
export const toggleTrusted = async (id) => {
  // If backend doesn't support this yet, log warning or implement endpoint
  console.warn("toggleTrusted not fully implemented in backend yet");
  return true;
};

export const addReview = async (review) => {
  try {
    const response = await axios.post(API_URL, review, {
      headers: getAuthHeader(),
    });
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error.response?.data?.message || error.message || "An error occurred";
  }
};
