# Use the official Node.js runtime as the base image
FROM node:18-alpine3.17 as build

ENV VITE_APP_API_URL=https://nanovolt-blog-api.fly.dev/api/v1

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json .

# Clean install dependencies
RUN npm ci

# Copy the entire application code to the container
COPY . .

# Build the React app for production
RUN npm run build

# Use Nginx as the production server
FROM nginx:1.24.0-alpine3.17

# Copy nginx configurations
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Copy the built React app to Nginx's web server directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the Nginx server

# WARNING The app is not listening on the expected address and will not be reachable by fly-proxy.
# You can fix this by configuring your app to listen on the following addresses:
#  - 0.0.0.0:80
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]