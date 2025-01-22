# Build stage
FROM node:20 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Build the React app for production
RUN npm run build

# Serve stage
FROM nginx:alpine

# Copy the build output to NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Copy the NGINX config
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80
