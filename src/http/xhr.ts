import axios, { AxiosInstance } from "axios";
import { getCookie } from "cookies-next";

const baseURL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL || "http://localhost:4000";

// Create new axios instance
const $http: AxiosInstance = axios.create({
    baseURL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
});

$http.interceptors.request.use(async (config) => {
    const accessToken = getCookie("access-token", {});

    // check if request data is a FormData instance
    if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
    }

    // If access-token is available, add it to the Axios Authorization header
    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
});

export default $http;
