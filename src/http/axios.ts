import axios, { type AxiosInstance } from "axios";

const api: AxiosInstance = axios.create();
api.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL;

// API AUTH
const apiAuth: AxiosInstance = axios.create();
apiAuth.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL;
// Interceptor
apiAuth.interceptors.request.use(
  function (config) {
    apiAuth.defaults.headers.common["Authorization"] = "Bearer jejejeje";
    // Do something before request is sent
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
      console.log("error....");
    }
    return Promise.resolve({ error });
  }
);

export { api, apiAuth };
