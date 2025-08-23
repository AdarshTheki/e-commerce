# Use Node.js base image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the backend port
EXPOSE 8000

# Run the backend server
CMD ["npm", "run", "dev"]
