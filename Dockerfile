# Use official Node.js image
FROM node:24

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port
EXPOSE 8443

# Start server
CMD ["node", "server.js"]
