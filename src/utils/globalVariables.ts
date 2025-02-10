const CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.VITE_ENVIRONMENT === "development"
      ? "http://localhost:8000"
      : "https://product-selection-backend.us.aldryn.io"),
};

export default CONFIG;
