# Use an official Node.js runtime as a parent image.
# Using a slim version to keep the image size down.
FROM node:20-slim

# Set the working directory in the container.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to leverage Docker's layer caching.
# This step will only be re-run if these files change.
COPY package*.json ./

# Install app dependencies using 'npm ci' for a clean, deterministic install from package-lock.json.
# --only=production ensures that devDependencies are not installed.
RUN npm ci --only=production

# Copy the rest of the application's source code.
COPY . .

# Your app binds to port 8080, so you need to expose it.
# Cloud Run will automatically use the PORT environment variable.
EXPOSE 8080

# Define the command to run your app.
CMD [ "node", "src/api/server.js" ]
