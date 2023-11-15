import ls from "localstorage-slim";
import axios from "axios";
import { UserStore } from "@/store/user";

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the request config here (add headers, authentication tokens)
    const accessToken = ls.get<{ state: UserStore }>("user-storage")?.state
      ?.token;

    // If token is present add it to request's Authorization Header
    if (accessToken) {
      if (config.headers)
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors here

    return Promise.reject(error);
  }
);

export default axiosInstance;
