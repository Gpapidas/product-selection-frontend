import {test, expect} from "@playwright/test";

test.describe("Product List Functionality", () => {
    test.beforeEach(async ({page}) => {
        await page.route("**/api/v1/auth/login/", async (route) => {
            await route.fulfill({
                status: 200,
                body: JSON.stringify({
                    type: "success",
                    detail: "Login successful",
                    data: {
                        accessToken: "mock-access-token",
                        refreshToken: "mock-refresh-token",
                        user: {id: 1, email: "test@example.com", username: "testuser"},
                    },
                }),
                headers: {"Content-Type": "application/json"},
            });
        });

        await page.route("**/api/v1/products/products/", async (route) => {
            await route.fulfill({
                status: 200,
                body: JSON.stringify({
                    type: "success",
                    detail: "Products retrieved successfully",
                    data: [
                        {
                            id: 1,
                            name: "Product A",
                            description: "Desc A",
                            price: "10.99",
                            stock: 10,
                            selected: false,
                            derivedFromSavedSearch: null
                        },
                        {
                            id: 2,
                            name: "Product B",
                            description: "Desc B",
                            price: "15.99",
                            stock: 20,
                            selected: false,
                            derivedFromSavedSearch: null
                        },
                    ],
                }),
                headers: {"Content-Type": "application/json"},
            });
        });

        await page.goto("/login");
        await page.fill('[data-testid="email-input"]', "test@example.com");
        await page.fill('[data-testid="password-input"]', "password123");
        await page.click('[data-testid="login-button"]');
        await page.waitForURL("/");
    });

    test("Product selection, reset, and deselection", async ({page}) => {
        // Step 1: Ensure product list is loaded
        await page.waitForSelector("[data-testid^='product-row-']", {timeout: 5000});

        const initialProductCount = await page.locator("[data-testid^='product-row-']").count();
        expect(initialProductCount).toBe(2);

        // Step 2: Mock API response for selecting Product A
        await page.route("**/api/v1/products/products/1/select/", async (route) => {
            await route.fulfill({
                status: 200,
                body: JSON.stringify({
                    type: "success",
                    detail: "Product selected",
                    data: {
                        id: 1,
                        name: "Product A",
                        description: "Desc A",
                        price: "10.99",
                        stock: 10,
                        selected: true,
                        derivedFromSavedSearch: null
                    },
                }),
                headers: {"Content-Type": "application/json"},
            });
        });

        await page.route("**/api/v1/products/products/", async (route) => {
            await route.fulfill({
                status: 200,
                body: JSON.stringify({
                    type: "success",
                    detail: "Products retrieved successfully",
                    data: [
                        {
                            id: 1,
                            name: "Product A",
                            description: "Desc A",
                            price: "10.99",
                            stock: 10,
                            selected: true,
                            derivedFromSavedSearch: null
                        },
                        {
                            id: 2,
                            name: "Product B",
                            description: "Desc B",
                            price: "15.99",
                            stock: 20,
                            selected: false,
                            derivedFromSavedSearch: null
                        },
                    ],
                }),
                headers: {"Content-Type": "application/json"},
            });
        });

        // Click to select Product A
        await page.click('[data-testid="select-product-1"]');

        // Wait for 2 seconds before checking selection
        await page.waitForTimeout(2000);

        // Ensure Product A is selected
        await expect(page.locator('[data-testid="select-product-1"]')).toBeChecked();

        // Step 3: Mock API response for resetting product list (Product A remains selected)
        await page.route("**/api/v1/products/products/?reset_search=true", async (route) => {
            await route.fulfill({
                status: 200,
                body: JSON.stringify({
                    type: "success",
                    detail: "Products retrieved successfully",
                    data: [
                        {
                            id: 1,
                            name: "Product A",
                            description: "Desc A",
                            price: "10.99",
                            stock: 10,
                            selected: true,
                            derivedFromSavedSearch: null
                        },
                        {
                            id: 2,
                            name: "Product B",
                            description: "Desc B",
                            price: "15.99",
                            stock: 20,
                            selected: false,
                            derivedFromSavedSearch: null
                        },
                    ],
                }),
                headers: {"Content-Type": "application/json"},
            });
        });

        // Click reset button
        await page.click('[data-testid="reset-search-button"]');

        // Wait for 2 seconds before checking the list reset
        await page.waitForTimeout(2000);

        // Ensure product list is back to initial state
        const resetProductCount = await page.locator("[data-testid^='product-row-']").count();
        expect(resetProductCount).toBe(2);

        // Ensure Product A is still selected
        await expect(page.locator('[data-testid="select-product-1"]')).toBeChecked();
    });
});
