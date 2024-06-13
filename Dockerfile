# Use an official Node.js runtime as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application files
COPY . ./

# Build the React application for production
RUN npm run build

# Install PM2 globally
# RUN npm install -g pm2

# Expose port 80 to the outside world
EXPOSE 80

# Start PM2 and serve the React app using serve
CMD ["npm", "run", "start"]
