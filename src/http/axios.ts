import axios, { type AxiosInstance } from "axios";

const api: AxiosInstance = axios.create();
api.defaults.baseURL = process.env.VITE_APP_BASE_URL;

// API AUTH
const apiAuth: AxiosInstance = axios.create();
apiAuth.defaults.baseURL = process.env.VITE_APP_BASE_URL;
// Interceptor
apiAuth.interceptors.request.use(
  (config: any) => {
    // Do something before request is sent
    const token = localStorage.getItem("token") || "undefined";
    config.headers.common.Authorization = token;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

apiAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      location.href = "/";
    }
    if (error.response.status === 500) {
      console.log("server error");
    }
    return Promise.reject({ error });
  }
);

export { api, apiAuth };
