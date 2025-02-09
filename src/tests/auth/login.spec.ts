import {test, expect} from "@playwright/test";

test.describe("Login Page", () => {
    test.beforeEach(async ({page}) => {
        // Navigate to the login page
        await page.goto("/login");

        // Wait for email input to be visible before proceeding
        await page.waitForSelector('[data-testid="email-input"]', {timeout: 5000});
    });

    test("logs in successfully", async ({page}) => {
        // Mock the API request for login with the correct response structure
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
                headers: {"Content-Type": "application/json"},
            });
        });

        // Fill in login form
        await page.fill('[data-testid="email-input"]', "test@example.com");
        await page.fill('[data-testid="password-input"]', "password123");

        // Click login button
        await page.click('[data-testid="login-button"]');

        // Wait for navigation to the home page
        await page.waitForURL("/");

        // Confirm user is redirected
        await expect(page).toHaveURL("/");
    });

    test("shows error on incorrect credentials", async ({page}) => {
        // Mock API request for incorrect login credentials
        await page.route("**/api/v1/auth/login/", async (route) => {
            await route.fulfill({
                status: 401,
                body: JSON.stringify({
                    type: "validation_error",
                    errors: [
                        {
                            "code": "invalid",
                            "detail": "Email is invalid",
                            "attr": null
                        }
                    ]
                }),
                headers: {"Content-Type": "application/json"},
            });
        });

        // Fill in incorrect login
        await page.fill('[data-testid="email-input"]', "wrongemailformat");
        await page.fill('[data-testid="password-input"]', "wrongpassword");

        // Click login button
        await page.click('[data-testid="login-button"]');

        // Wait for the error notification
        const errorMessage = page.locator("#error-notification");
        await expect(errorMessage).toBeVisible();
    });
});
