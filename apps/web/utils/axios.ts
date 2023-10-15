import axios from "axios";
import authHeader from "./auth-header";
import config from "./config";

const axiosInstance = axios.create({
  baseURL: config.BACKEND_URL,
  headers: authHeader(),
});

export default axiosInstance;