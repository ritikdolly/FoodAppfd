import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8080", // Adjust this to your Spring Boot backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the auth token if available
// client.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

export default client;
