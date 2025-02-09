import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";


export default defineConfig(() => {

    return {
        plugins: [react()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        define: {
            "import.meta.env.VITE_API_BASE_URL": JSON.stringify(process.env.VITE_API_BASE_URL || ""),
        },
    };
});
