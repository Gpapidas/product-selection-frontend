# Use Node.js as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy all project files
COPY . .

# Expose Vite default port
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev", "--", "--host"]
