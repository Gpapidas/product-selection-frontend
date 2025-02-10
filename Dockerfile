# Use Node.js as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy all project files
COPY . .


# Inject environment variable at build time
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Make sure Vite sees it
RUN echo "VITE_API_BASE_URL=${VITE_API_BASE_URL}" > .env.production


# Build the frontend
RUN npm run build

# Expose port 80 for production
EXPOSE 80

# Serve the built frontend in production
CMD ["npm", "run", "start"]
