import {defineConfig} from '@playwright/test';

export default defineConfig({
    testDir: './src/tests',
    timeout: 10000,
    retries: 1,
    use: {
        headless: true,
        baseURL: 'http://localhost:5173',
    },
});
