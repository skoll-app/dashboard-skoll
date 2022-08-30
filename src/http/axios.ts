import axios, { type AxiosInstance } from "axios";
console.log(import.meta.env.VITE_APP_BASE_URL)
const api: AxiosInstance = axios.create();
api.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL;

// API AUTH
const apiAuth: AxiosInstance = axios.create();
apiAuth.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL;
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
    if (error.response.status === 401 || error.response.status === 500) {
      location.href = "/";
    }
    return Promise.reject({ error });
  }
);

export { api, apiAuth };
