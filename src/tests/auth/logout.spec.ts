import { test, expect } from "@playwright/test";

test.describe("Logout Functionality", () => {
    test.beforeEach(async ({ page }) => {
        // Mock login API request
        await page.route("**/api/v1/auth/login/", async (route) => {
            await route.fulfill({
                status: 200,
                body: JSON.stringify({
                    type: "success",
                    detail: "Login successful",
                    data: {
                        accessToken: "mock-access-token",
                        refreshToken: "mock-refresh-token",
                        user: {
                            id: 1,
                            email: "test@example.com",
                            username: "testuser",
                            firstName: "Test",
                            lastName: "User",
                        },
                    },
                }),
                headers: { "Content-Type": "application/json" },
            });
        });

        // Mock user session
        await page.route("**/api/v1/auth/me/", async (route) => {
            await route.fulfill({
                status: 200,
                body: JSON.stringify({
                    type: "success",
                    detail: "User fetched successfully",
                    data: {
                        id: 1,
                        email: "test@example.com",
                        username: "testuser",
                        firstName: "Test",
                        lastName: "User",
                    },
                }),
                headers: { "Content-Type": "application/json" },
            });
        });

        // Mock logout API request
        await page.route("**/api/v1/auth/logout/", async (route) => {
            await route.fulfill({
                status: 200,
                body: JSON.stringify({
                    type: "success",
                    detail: "Logged out successfully",
                    data: null,
                }),
                headers: { "Content-Type": "application/json" },
            });
        });

        // Navigate to login page
        await page.goto("/login");

        // Perform login
        await page.fill('[data-testid="email-input"]', "test@example.com");
        await page.fill('[data-testid="password-input"]', "password123");
        await page.click('[data-testid="login-button"]');

        // Wait for navigation to home page
        await page.waitForURL("/");

        // Confirm user is redirected
        await expect(page).toHaveURL("/");

        // Ensure user menu appears (indicating successful login)
        await page.waitForSelector('[data-testid="user-menu-button"]', { timeout: 5000 });
    });

    test("logs out successfully", async ({ page }) => {
        // Click on the user menu to open the dropdown
        await page.click('[data-testid="user-menu-button"]');

        // Click on the logout button
        await page.click('[data-testid="logout-button"]');

        // Wait for navigation to login page
        await page.waitForURL("/login");

        // Confirm user is redirected to login
        await expect(page).toHaveURL("/login");
    });
});
