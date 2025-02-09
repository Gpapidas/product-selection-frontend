import {createBrowserRouter} from "react-router-dom";
import HelloWorldPage from "./features/pages/HelloWorldPage.tsx";


export const ROUTES = {
    HELLO_WORLD: "/helloworld",
};

export const generatePath = {};

export const router = createBrowserRouter([
    {
        path: ROUTES.HELLO_WORLD,
        element: <HelloWorldPage/>
    },
]);
