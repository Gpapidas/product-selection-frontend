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

# Expose port 80 for production
EXPOSE 80

# Serve the built frontend in production
CMD ["npm", "run", "start"]
