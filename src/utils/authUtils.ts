import axios from "axios";

// Utility function to get the access token from localStorage
export const getAccessToken = (): string | null => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        const {token, expiration} = JSON.parse(accessToken);
        if (new Date().getTime() < expiration) {
            return token;
        } else {
            localStorage.removeItem("accessToken"); // Token expired
            return null;
        }
    }
    return null;
};

// Utility function to set the access token in localStorage
export const setAccessToken = (token: string, expiration: number): void => {
    localStorage.setItem("accessToken", JSON.stringify({token, expiration}));
};

// Utility function to clear the access token from localStorage
export const clearAccessToken = (): void => {
    localStorage.removeItem("accessToken");
};

const authAxios = axios.create();

authAxios.interceptors.request.use(
    config => {
        if (config.headers?.skipAuth) {
            delete config.headers.skipAuth; // Remove it before sending the request
            return config;
        }

        const token = getAccessToken();
        if (token) {
            config.headers = config.headers || {};
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    error => Promise.reject(error)
);


export default authAxios;
