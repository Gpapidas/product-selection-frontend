import axios from "axios";
import toCamelCase from "@/utils/camelCaseUtils.ts";

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

// Utility function to get the refresh token from localStorage
export const getRefreshToken = (): string | null => {
    return localStorage.getItem("refreshToken");
};

// Utility function to set access and refresh tokens separately
export const setAuthTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", JSON.stringify({token: accessToken, expiration: Date.now() + 15 * 60 * 1000})); // 5 min expiry
    localStorage.setItem("refreshToken", refreshToken); // Refresh token lasts until explicitly logged out
};


// Utility function to clear the access token from localStorage
export const clearAccessToken = (): void => {
    localStorage.removeItem("accessToken");
};

// Utility function to clear BOTH tokens on logout
export const clearAuthTokens = (): void => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};

const authAxios = axios.create();

let isRefreshing = false; // Prevent multiple refresh attempts

authAxios.interceptors.request.use(
    async config => {
        if (config.headers?.skipAuth) {
            delete config.headers.skipAuth;
            return config;
        }

        let token = getAccessToken();

        if (!token && !isRefreshing) { // Prevent multiple refresh attempts
            isRefreshing = true;
            const newTokens = await refreshTokens();
            isRefreshing = false;

            if (newTokens) {
                token = newTokens.accessToken;
            }
        }

        if (token) {
            config.headers = config.headers || {};
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        isRefreshing = false; // Reset on error
        return Promise.reject(error);
    }
);


authAxios.interceptors.response.use(
    response => {
        response.data = toCamelCase(response.data); // Transform response data to camelCase
        return response;
    },
    error => Promise.reject(error)
);


// Function to refresh both tokens
export const refreshTokens = async (): Promise<{ accessToken: string; refreshToken: string } | null> => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return null; // If refresh token is missing, we cannot refresh

    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/refresh/`,
            {refresh: refreshToken}
        );
        const {access, refresh} = response.data.data;
        setAuthTokens(access, refresh);
        return {accessToken: access, refreshToken: refresh};
    } catch {
        clearAuthTokens();
        return null;
    }
};


export default authAxios;
