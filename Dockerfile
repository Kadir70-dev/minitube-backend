# Step 1: Use an official Node.js image as the base image
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Step 4: Install dependencies inside the container
RUN npm install

# Step 5: Copy the rest of the project files into the container
COPY . .

# Step 6: Expose the port the app will run on (adjust as necessary)
EXPOSE 3000

# Step 7: Define the command to run your application
CMD ["npm", "start"]
