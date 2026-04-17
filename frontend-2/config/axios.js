import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// response interceptors


let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // ❌ not 401 → just throw error
    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    // ❌ prevent infinite retry
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // 🔄 if refresh already running
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // 🔑 refresh token call
      const res = await axios.post(
        "/api/refresh",
        {},
        { withCredentials: true }
      );

      const newToken = res.data.accessToken;

      // 💾 save token
      localStorage.setItem("accessToken", newToken);

      // 🔓 unlock queue
      processQueue(null, newToken);

      // 🔁 retry original request
      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      return api(originalRequest);
    } catch (err) {
      processQueue(err, null);

      // 💀 logout user
      localStorage.removeItem("accessToken");
      window.location.href = "/login";

      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
