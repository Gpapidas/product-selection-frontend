import {useEffect, useState} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {ROUTES} from "@/router.tsx";
import {getAccessToken, getRefreshToken, refreshTokens} from "@/utils/authUtils.ts";

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            let token = getAccessToken();

            if (!token) {
                const refreshToken = getRefreshToken();
                if (refreshToken) {
                    const newTokens = await refreshTokens();
                    if (newTokens) {
                        token = newTokens.accessToken;
                    }
                }
            }

            setIsAuthenticated(!!token);
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return null; // Prevents flashing of login screen while checking
    }

    return isAuthenticated ? <Outlet/> : <Navigate to={ROUTES.LOGIN}/>;
};

export default ProtectedRoute;
