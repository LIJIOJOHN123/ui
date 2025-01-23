# Use an official Node.js runtime as a parent image
FROM node:20 AS build

# Set the working directory inside the container
WORKDIR /app


COPY ./package*.json ./
# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./ ./

# Build the React app
RUN npm run build

# The NGINX container will serve this
FROM nginx:alpine

# Copy the build output to NGINX's public folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose the default NGINX port
EXPOSE 80