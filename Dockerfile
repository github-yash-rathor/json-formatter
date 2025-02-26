# Use an official Python image for the backend
FROM python:3.10 AS backend

WORKDIR /app

# Install Python dependencies
COPY backend/requirements.txt backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy backend code
COPY backend /app/backend

# Use an official Node.js image for the frontend
FROM node:20 AS frontend

WORKDIR /app

# Copy frontend dependencies and install
COPY frontend/package.json frontend/package-lock.json frontend/
RUN cd frontend && npm install

# Build the React frontend
COPY frontend /app/frontend
RUN cd frontend && npm run build

# Final stage: Run the application
FROM python:3.10

WORKDIR /app

# Copy backend files from the previous build stage
COPY --from=backend /app/backend /app/backend
COPY --from=backend /root/.local /root/.local

# Copy the built frontend from the previous stage
COPY --from=frontend /app/frontend/dist /app/backend/static

# Set environment variables
ENV PATH=/root/.local/bin:$PATH

# Expose FastAPI port
EXPOSE 8000

# Start the backend with Uvicorn
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
