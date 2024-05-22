import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://dev.deeep.site",
    withCredentials: true,
});

export default axiosInstance;
