# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copy only package files first (for caching)
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Build the project (creates /app/build by default)
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

# Copy build folder from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Optional: copy custom nginx config if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
