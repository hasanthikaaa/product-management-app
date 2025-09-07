# Fullstack Project Setup Guide

## 1️⃣ Prerequisites

Before starting, make sure you have installed:

- **Node.js** (v18+) and **npm**  
  [Download Node.js](https://nodejs.org/)
- **Docker** and **Docker Compose**  
  [Install Docker](https://docs.docker.com/get-docker/)
- Optional for local development: **Git**

---

## 2️⃣ Project Installation

1. Clone your project repository:

```bash
git clone <your-repo-url>
cd project
```

## 3️⃣ Environment Variables Setup
Replace values in environment variables in `docker-compose.yml`

```bash
version: "3.9"

services:
  backend:
    build: ./backend
    container_name: backend
    ports:
      - "3002:3002"
    environment:
      AWS_REGION:
      AWS_ACCESS_KEY_ID:
      AWS_SECRET_ACCESS_KEY:
      PRODUCT_TABLE:
      ANALYTICS_TABLE:
      PRODUCT_QUEUE_URL:
    networks:
      - app-network

  frontend:
    build: ./frontend
    container_name: frontend
    ports:
      - "8080:80"
    environment:
      REACT_APP_BASE_URL: http://localhost:3001
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

```

## 4️⃣ Docker Setup
### 4.1 Backend Dockerfile

Located in backend/Dockerfile, builds Node.js + TypeScript backend.

### 4.2 Frontend Dockerfile

Located in frontend/Dockerfile, builds Vite app and serves via Nginx.

### 4.3 Docker Compose

Located in docker-compose.yml at the project root.

Defines both backend and frontend services on the same network.

## 5️⃣ Docker Commands

### 5.1 Build and start containers

```bash
docker-compose up --build
```

### 5.2 Stop containers

```bash
docker-compose down
```

### 5.3 Rebuild a single service
```bash
docker-compose up --build backend
docker-compose up --build frontend
```
### 5.4 View container logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```