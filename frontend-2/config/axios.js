import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7007/api",
  withCredentials: true,
});

//Request Interceptor

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

//Response interceptor

let isRefreshing = false;
let failedQueue = [];

const processQueue = (errors, token) => {
  failedQueue.forEach((val) => {
    if (errors) {
      return val.reject(errors);
    } else {
      return val.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  // if response came return exact response

  (response) => response,

  //Errors

  async (error) => {
    const originalRequest = error.config;
    // if some other error no need to handle here in axios configuration

    if (
      !error.response ||
      (error.response.data.statusCode !== 500 &&
        error.response.data.message !== "jwt expired")
    ) {
      return Promise.reject(error);
    }

    // if retried already then also no need to handle here

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      });
    }

    isRefreshing = true;
    originalRequest._retry = true;

    try {
      const response = await axios.get("/api/auth/refresh-token", {
        withCredentials: true,
      });

      const newToken = response.data.data.accessToken;

      localStorage.setItem("accessToken", newToken);

      processQueue(null, newToken);

      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      console.log('Token refreshed and request reattempted');
      

      return api(originalRequest);
    } catch (error) {

      processQueue(error, null);

      localStorage.removeItem('accessToken');
      return Promise.reject(error);
    }finally{
        isRefreshing = false;
    }
  },
);


export default api;