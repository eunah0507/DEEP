import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://deeep.site",
    withCredentials: true,
});

export default axiosInstance;
