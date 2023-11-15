import ls from "localstorage-slim";
import axios from "axios";
import { UserStore } from "@/store/user";

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = ls.get<{ state: UserStore }>("user-storage")?.state
      ?.token;

    if (accessToken) {
      if (config.headers)
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    const { status } = error?.response || {};
    if (status === 401) {
      ls.set("user-storage", JSON.stringify({ state: {} }));
      window.location.reload();
    }
  }
);

export default axiosInstance;
