import {createBrowserRouter} from "react-router-dom";
import {LoginPage} from "@/features/pages/LoginPage.tsx";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute.tsx";
import {ProductsPage} from "@/features/pages/ProductsPage.tsx";


export const ROUTES = {
    PRODUCTS: "/",
    LOGIN: "/login",
};

export const generatePath = {};

export const router = createBrowserRouter([
    {
        path: ROUTES.LOGIN,
        element: <LoginPage/>,
    },
    {
        path: ROUTES.PRODUCTS,
        element: <ProtectedRoute/>,
        children: [{path: ROUTES.PRODUCTS, element: <ProductsPage/>}],
    },
]);
