# Use Node Version 14.16 and alpine, because it is smaller
FROM node:14.16-alpine

# Set the working directory 
WORKDIR /backend

# copy package.json into the container 
COPY package*.json ./

# install dependencies
RUN npm install

# Copy the current directory contents into the container
COPY . .

# Make port 3000 available to the world outside this container
ENV PORT=3000
EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "start"]