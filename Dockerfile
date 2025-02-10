# Use Node.js as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy all project files
COPY . .

# Copy the entrypoint script and set executable permissions
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Build the frontend
RUN npm run build

# Expose port 80 for production
EXPOSE 80

# Use the entrypoint script to inject environment variables at runtime
ENTRYPOINT ["/entrypoint.sh"]
