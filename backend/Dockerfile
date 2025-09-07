# Use Node.js LTS
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build TypeScript (optional)
RUN npm run build

EXPOSE 3000

# Start backend
CMD ["node", "dist/index.js"]
