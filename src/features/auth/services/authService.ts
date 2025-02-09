import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    AuthResponse,
    CurrentUserResponse,
    LoginCredentials,
    LogoutRequest,
    LogoutResponse
} from "@/features/auth/types/authTypes.ts";
import authAxios, {clearAuthTokens, getAccessToken, getRefreshToken, setAuthTokens} from "@/utils/authUtils.ts";
import {handleGlobalError} from "@/App.tsx";


class AuthService {
    private backendUrl: string;

    constructor() {
        this.backendUrl = "https://product-selection-backend.us.aldryn.io"
    }

    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const res = await authAxios.post<AuthResponse>(`${this.backendUrl}/api/v1/auth/login/`, credentials, {
            headers: {skipAuth: "true"}
        });

        const {accessToken, refreshToken} = res.data.data;
        setAuthTokens(accessToken, refreshToken);
        return res.data;
    }

    async logout(): Promise<void> {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            throw new Error("No refresh token found.");
        }

        const requestBody: LogoutRequest = {refresh_token: refreshToken};

        await authAxios.post<LogoutResponse>(`${this.backendUrl}/api/v1/auth/logout/`, requestBody);

        clearAuthTokens();
        localStorage.removeItem("refreshToken");
    }

    async getCurrentUser(): Promise<CurrentUserResponse> {
        const res = await authAxios.get<CurrentUserResponse>(`${this.backendUrl}/api/v1/auth/me/`);
        return res.data;
    }
}

export const authService = new AuthService();

export const useLogin = () => {
    const mutation = useMutation<AuthResponse, Error, LoginCredentials>({
        mutationFn: (credentials) => authService.login(credentials),
        onError: handleGlobalError,
    });

    return {
        mutate: mutation.mutate,
        isLoading: mutation.isPending,
        error: mutation.error,
    };
};

export const useLogout = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            clearAuthTokens();
            queryClient.removeQueries({queryKey: ["current-user"]});
        },
    });

    return {
        mutate: mutation.mutate,
        isLoading: mutation.isPending,
        error: mutation.error,
    };
};

export const useCurrentUser = ({enabled = true} = {}) => {
    const token = getAccessToken();

    const query = useQuery({
        queryKey: ["current-user"],
        queryFn: () => authService.getCurrentUser(),
        enabled: enabled && !!token,
    });

    return {
        data: query.data,
        isLoading: query.isPending,
        error: query.error,
    };
};
