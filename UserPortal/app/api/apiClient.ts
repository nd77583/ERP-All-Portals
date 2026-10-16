import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";

const apiClient = axios.create({
    baseURL,
    headers:{
        "Content-Type": "application/json",
    }
})

apiClient.interceptors.request.use((config) => {
    if (!config.baseURL) {
        config.baseURL = baseURL;
    }
    return config;
});

export default apiClient;
