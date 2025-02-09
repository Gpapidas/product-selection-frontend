import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Layout} from "../../Layout.tsx";
import {Login} from "@/features/auth/components/Login.tsx";
import {useCurrentUser} from "@/features/auth/services/authService.ts";
import {ROUTES} from "@/router.tsx";
import {getAccessToken} from "@/utils/authUtils.ts";

export const LoginPage = () => {
    const navigate = useNavigate();
    const token = getAccessToken();
    const {data: user, isLoading} = useCurrentUser({enabled: !!token});

    useEffect(() => {
        if (token && !isLoading && user) {
            navigate(ROUTES.PRODUCTS);
        }
    }, [token, isLoading, user, navigate]);

    return <Layout mainContent={<Login/>} hideUser={true}/>;
};
