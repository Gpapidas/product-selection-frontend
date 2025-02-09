# Use Node.js as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy all project files
COPY . .

# Inject environment variables at build time
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Log to verify it's available
RUN echo "Building with VITE_API_BASE_URL=${VITE_API_BASE_URL}"

# Build the frontend
RUN npm run build

# Expose port 80 for production
EXPOSE 80

# Serve the built frontend in production
CMD ["npm", "run", "preview"]
