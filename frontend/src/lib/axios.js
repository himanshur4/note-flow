import axios from "axios";

const BASE_URL = import.meta.env.PROD 
    ? "https://noteflow-backend-anvi.onrender.com/api"  // Replace with your Render URL
    : "http://localhost:5001/api";

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

export default api;