import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the auth token if available
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = crypto.randomUUID
        ? crypto.randomUUID()
        : Date.now().toString(36) + Math.random().toString(36).substr(2);
      localStorage.setItem("sessionId", sessionId);
    }
    config.headers["X-Session-Id"] = sessionId;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default client;
