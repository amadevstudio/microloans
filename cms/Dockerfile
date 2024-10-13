# Use Node.js 20.9.0 as the base image
FROM node:20.9.0-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Strapi application
RUN npm run build

# Expose the port the app runs on
EXPOSE 1337

# Start the application
CMD ["npm", "start"]
