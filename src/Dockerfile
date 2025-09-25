# --- Stage 1: Build ---
# Use a Node.js image to build the Vite/React application.
# Using alpine for a smaller image size.
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker's layer caching.
# This step will only be re-run if these files change.
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application source code into the container
COPY . .

# Run the build script defined in package.json
RUN npm run build

# --- Stage 2: Serve ---
# Use a lightweight Nginx image to serve the static files.
FROM nginx:stable-alpine

# Copy the custom Nginx configuration file provided.
# This config is set up to listen on port 8080, as required by Cloud Run,
# and correctly handle routing for a Single Page Application (SPA).
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built static assets from the 'builder' stage to the Nginx public directory.
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 8080 to the outside world.
EXPOSE 8080

# The default command for the nginx image is to start the server.
# CMD ["nginx", "-g", "daemon off;"]