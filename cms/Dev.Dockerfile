FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that Strapi runs on
EXPOSE 1337

# Start the Strapi application in development mode
CMD ["npm", "run", "develop"]
