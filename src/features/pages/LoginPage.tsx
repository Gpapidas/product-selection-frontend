import {Layout} from "../../Layout.tsx";
import {Login} from "@/features/auth/components/Login.tsx";
import {useNavigate} from "react-router-dom";
import {useCurrentUser} from "@/features/auth/services/authService.ts";
import {useEffect} from "react";
import {ROUTES} from "@/router.tsx";


export const LoginPage = () => {
    const navigate = useNavigate();
    const {data: user, isLoading} = useCurrentUser();

    useEffect(() => {
        if (!isLoading && user) {
            navigate(ROUTES.HELLO_WORLD);
        }
    }, [isLoading, user, navigate]);

    return <Layout mainContent={<Login/>} hideUser={true}/>;
};
