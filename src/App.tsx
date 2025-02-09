import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Notifications, showNotification } from "@mantine/notifications";
import axios from "axios";
import {router} from "@/router.tsx"; // Make sure axios is imported

export const handleGlobalError = (error: unknown) => {
    console.error("API Error:", error);

    if (axios.isAxiosError(error) && error.response?.data) {
        const errorResponse = error.response.data as { detail?: string; errors?: { detail: string }[] };
        const errorMessage = errorResponse?.detail || errorResponse?.errors?.[0]?.detail || "An error occurred";

        showNotification({
            title: "Error",
            message: errorMessage,
            color: "red",
            styles: {
                root: {
                    maxWidth: "600px",
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    zIndex: 9999,
                },
                title: {
                    fontWeight: 600,
                },
                description: {
                    fontSize: "14px",
                },
            },
        });
    }
};

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false, // Disable auto-retry to immediately trigger error handling
        },
        mutations: {
            retry: false, // Disable auto-retry for mutations
        },
    },
});

function App() {
    return (
        <MantineProvider>
            <Notifications position="bottom-right" />
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </MantineProvider>
    );
}

export default App;
