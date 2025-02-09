import {BaseResponse} from "@/types/baseResponseType.ts";

export type LoginCredentials = {
    email: string;
    password: string;
};

export type AuthData = {
    accessToken: string;
    refreshToken: string;
    user: {
        id: number;
        email: string;
        username: string;
        firstName: string;
        lastName: string;
    };
};

// Login Response
export type AuthResponse = BaseResponse<AuthData>;

// Current User Response
export type User = {
    id: number;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
};

export type CurrentUserResponse = BaseResponse<User>;

// Logout Request & Response
export type LogoutRequest = {
    refresh_token: string;
};

// Since `data` is `null`, explicitly use `null` for `BaseResponse`
export type LogoutResponse = BaseResponse<null>;

