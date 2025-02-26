# Backend Dockerfile
# Use the official Python image from Docker Hub
FROM python:3.10 AS backend

# Set the working directory for the backend
WORKDIR /app

# Copy the backend requirements file
COPY backend/requirements.txt .

# Install the backend dependencies
RUN pip install -r requirements.txt

# Copy the backend application code
COPY backend/ .

# Frontend Dockerfile
# Use the official Node.js image from Docker Hub
FROM node:20 AS frontend

# Set the working directory for the frontend
WORKDIR /app/frontend

# Copy both package.json and package-lock.json into the container
COPY frontend/package.json frontend/package-lock.json ./frontend/

# Install frontend dependencies
RUN npm install --no-cache

# Copy the entire frontend application code into the container
COPY frontend /app/frontend/

# Build the frontend
RUN npm run build

# Expose necessary ports
EXPOSE 5000
EXPOSE 3000

# Set environment variables for both frontend and backend
ENV BACKEND_URL=http://localhost:5000

# Start the backend application and frontend application
CMD ["sh", "-c", "cd backend && python3 app.py & cd frontend && npm run start"]
