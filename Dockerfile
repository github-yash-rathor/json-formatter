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
# Use the official Node.js image
FROM node:20 AS frontend

# Set working directory
WORKDIR /app/frontend

# Copy only the package.json and package-lock.json first
COPY frontend/package.json frontend/package-lock.json ./

# Install dependencies using npm ci for faster, cleaner install
RUN npm ci --no-cache --verbose

# Copy the rest of the frontend code
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
