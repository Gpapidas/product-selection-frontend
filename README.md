# Product Selection Frontend

## Introduction

This is the repository that will serve the process of the Frontend side of Product Selection.

## Initial Setup

1. Install [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm).
2. Install the node version (by utilizing the NVM) specified in the `.nvmrc` file.
3. Create a `.env` file.
4. Use the `.env.template` file as a baseline to add the environment variables needed in `.env` file to run the project.
5. Run `npm run dev` to run the project locally.

## Running with Docker

The frontend can also be run inside a **Docker container** for consistency and easier environment setup.

### **1. Build the Docker Image**
Run the following command to build the Docker image:

```sh
docker compose build
```

### **2. Run the Container**
Start the application with:

```sh
docker compose up
```

### **3. Removing Containers and Volumes**
If you want to stop the containers **and also remove associated volumes** (e.g., clearing cached data), run:

```sh
docker-compose down --volumes
```
This will delete all named volumes, ensuring a clean state when restarting the container.


## Folder structure

The main focus will be under the `src/` subdirectories.

- `components/`: Used for components that are widely used across the application.
- `features/`: This is where everything is located regarding a feature (e.g. products), namely, the view for that functionality, the API implementation, and helper methods. The intent is for every feature to have its submodules colocated in the same folder to make it easier for developers to maintain.
- `utils/`: Utility methods that are being widely used across the application.

## Feature Structure (example - Auth)

### `src/features/auth`
Contains all authentication-related logic.

- **`services/`** → Implements API communication.
  - `authService.ts` → Handles login, logout, current user retrieval, and token refresh.
- **`types/`** → Defines TypeScript types for authentication.
  - `authTypes.ts` → Defines types like `AuthResponse`, `LoginCredentials`, etc.
- **`components/`** → UI components related to authentication.
  - `Login.tsx` → The login form.
- **`pages/`** → Full authentication-related pages.
  - `LoginPage.tsx` → Uses the `Login` component inside `Layout`.

## Routing and Layout

Routing is managed using `react-router-dom`.  
Protected routes ensure only authenticated users can access specific pages.

- **`ProtectedRoute.tsx`** → Redirects unauthenticated users to the login page.
- **`Layout.tsx`** → Wraps pages with shared UI elements, such as the `Header`.
