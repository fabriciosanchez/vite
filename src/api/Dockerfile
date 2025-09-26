# --- Build Stage ---
# Use an official Node.js runtime as a parent image for building the app.
FROM node:20-slim AS build

# Set the working directory in the container.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to leverage Docker's layer caching.
COPY package*.json ./

# Install all dependencies, including devDependencies that might be needed for a build step.
RUN npm ci

# Copy the rest of the application's source code.
COPY . .

# DB env
ARG DB_USER
ARG DB_HOST
ARG DB_NAME
ARG DB_PASSWORD

ENV DB_USER=$DB_USER
ENV DB_HOST=$DB_HOST
ENV DB_NAME=$DB_NAME
ENV DB_PASSWORD=$DB_PASSWORD

# --- Production Stage ---
# Use a slim Node.js image for the final production image.
FROM node:20-slim AS production

WORKDIR /usr/src/app

# Copy only the production dependencies from the build stage.
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./

# Copy the application code from the build stage.
COPY --from=build /usr/src/app/server.js ./

# Cloud Run will automatically use the PORT environment variable.
EXPOSE 8080

# Define the command to run your app.
CMD [ "node", "server.js" ]
