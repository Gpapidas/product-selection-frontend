# Authentication Logic

## Overview
The authentication system in this project follows the industry-standard JWT-based approach. It consists of **access tokens** and **refresh tokens**.

## Token System
- **Access Token**: Short-lived (15 minutes), used for API authentication.
- **Refresh Token**: Longer-lived (1 day), used to refresh access tokens when they expire.
- **Token Rotation**: When a refresh token is used, a new access and refresh token pair is issued.

## Authentication Flow
1. **User Login**
   - The user provides valid credentials (`email` and `password`).
   - The backend issues both an **access token** and a **refresh token**.
   - The frontend stores them securely in `localStorage`.

2. **Making Authenticated Requests**
   - The frontend includes the **access token** in the `Authorization` header (`Bearer <token>`).
   - If an access token is expired, the frontend automatically attempts a **token refresh**.

3. **Token Refresh Mechanism**
   - If an API request fails with `401 Unauthorized`, the frontend attempts to refresh the tokens using the **refresh token**.
   - If successful, it updates both tokens and retries the request.
   - If the refresh fails (e.g., token expired), the user is logged out.

4. **User Logout**
   - The refresh token is sent to the backend to invalidate it.
   - Both the **access token** and **refresh token** are removed from `localStorage`.
