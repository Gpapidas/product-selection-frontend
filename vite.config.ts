import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import EnvironmentPlugin from "vite-plugin-environment";


export default defineConfig(() => {

    return {
        plugins: [
            react(),
            EnvironmentPlugin("all", { prefix: "VITE_" })
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        }
    };
});
