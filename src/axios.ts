import axios from "axios";

const api = axios.create();
api.defaults.baseURL = "https://localhost:9001";

// API AUTH
const apiAuth = axios.create();
apiAuth.defaults.baseURL = "https://localhost:9002";
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
