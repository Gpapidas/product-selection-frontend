# Use Node.js as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy all project files
COPY . .

# Build the frontend
RUN npm run build

# Copy the entrypoint script to inject env variables at runtime
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose port 80 for production
EXPOSE 80

# Use the entrypoint script at runtime
ENTRYPOINT ["/entrypoint.sh"]

# Start the frontend server
CMD ["npm", "run", "start"]
