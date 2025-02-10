#!/bin/sh

echo "Injecting environment variables into env.js..."

# Replace the placeholder in env.js with the real environment variable
sed -i "s|VITE_API_BASE_URL_PLACEHOLDER|${VITE_API_BASE_URL}|g" /app/dist/env.js

echo "Updated env.js:"
cat /app/dist/env.js

# Start the frontend server
exec npm run start
