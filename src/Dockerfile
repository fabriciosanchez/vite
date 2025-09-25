# Stage 1: Build the React app
FROM node:18-alpine AS build
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the source code and build
COPY . .
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:1.25-alpine AS final
WORKDIR /usr/share/nginx/html

# Remove default Nginx content
RUN rm -rf ./*

# Copy custom Nginx configuration from the build stage
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from the 'build' stage
COPY --from=build /app/dist .

# Change ownership of the web root to the nginx user to avoid permission issues
RUN chown -R nginx:nginx /usr/share/nginx/html && chmod -R 755 /usr/share/nginx/html

# Expose port 8080 (as required by Cloud Run)
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]