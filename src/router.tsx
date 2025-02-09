import {createBrowserRouter} from "react-router-dom";
import {LoginPage} from "@/features/pages/LoginPage.tsx";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute.tsx";
import HelloWorldPage from "@/features/pages/HelloWorldPage.tsx";


export const ROUTES = {
    HELLO_WORLD: "/helloworld",
    LOGIN: "/login",
};

export const generatePath = {};

export const router = createBrowserRouter([
    {
        path: ROUTES.LOGIN,
        element: <LoginPage/>,
    },
    {
        path: ROUTES.HELLO_WORLD,
        element: <ProtectedRoute/>,
        children: [{path: ROUTES.HELLO_WORLD, element: <HelloWorldPage/>}],
    },
]);
