# Product Selection Frontend

## Introduction

This is the repository that will serve the process of the Frontend side of Product Selection

## Initial Setup

1. Install [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm)
2. Install the node version (by utilizing the NVM) specified in the `.nvmrc` file.
3. Create a `.env` file.
4. Use the `.env.template` file as a baseline to add the environment variables needed in `.env` file to run the project.
5. Run `npm run dev` to run the project locally.

## Folder structure

The main focus will be under the `src/` subdirectories.

- `components/`: Used for components that are widely used across the application.
- `features/`: This is where everything is located regarding a feature (e.g. products), namely, the view for that functionality, the API implementation, the helper methods. The intent is for every feature, the underlying submodules are colocated in the same folder to make it easier for the developers to maintain.
- `utils/`: Utility methods that are being widely used across the application.
