# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of your application
COPY . .

# Expose the application port
EXPOSE 5000

# Run the app
CMD ["npm", "start"]
