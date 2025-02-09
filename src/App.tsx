import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {RouterProvider} from "react-router-dom";
import "@mantine/core/styles.css";
import {MantineProvider} from "@mantine/core";
import {router} from "./router.tsx";

function App() {
    const queryClient = new QueryClient();

    return (
        <MantineProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}/>
            </QueryClientProvider>
        </MantineProvider>
    );
}

export default App;
