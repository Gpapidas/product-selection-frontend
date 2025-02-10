const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL !== "VITE_API_BASE_URL_PLACEHOLDER"
    ? import.meta.env.VITE_API_BASE_URL
    : "http://localhost:8000";

const CONFIG = {
  API_BASE_URL,
};

export default CONFIG;
