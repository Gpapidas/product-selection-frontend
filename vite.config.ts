import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    define: {
        // Inject placeholder that will be replaced at runtime
        "import.meta.env.VITE_API_BASE_URL": "VITE_API_BASE_URL_PLACEHOLDER",
    },
});
