# Backend Stage
FROM python:3.10 AS backend

# Set working directory for backend
WORKDIR /app/backend

# Copy and install backend dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY backend /app/backend


# Frontend Stage
FROM node:20 AS frontend

# Set working directory for frontend
WORKDIR /app/frontend

# Copy only package files first to install dependencies
COPY frontend/package.json frontend/package-lock.json ./

# Install dependencies
RUN npm install --no-cache --verbose

# Copy all frontend files
COPY frontend /app/frontend/

# Build the frontend
RUN npm run build


# Final Stage - Combine Frontend & Backend
FROM python:3.10

# Set working directory
WORKDIR /app

# Copy built frontend from frontend stage
COPY --from=frontend /app/frontend /app/frontend

# Copy backend from backend stage
COPY --from=backend /app/backend /app/backend

# Expose API port
EXPOSE 8000

# Start the backend server (Modify if using different framework)
CMD ["python", "/app/backend/main.py"]
