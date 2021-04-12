# PROJECT SETUP
This repository contains the backend. The frontend is located in a separate repository. This allows independent versioning of frontend and backend.

On your computer the final structure with both repositories in one folder should look like this:
```	
fine_app
├── fine_backend
├── fine_frontend
```

# BACKEND SPECIFIC: START DOCKER WITH VUE-FRONTEND, NODE.JS-SERVER AND MONGODB
The Project is automatically set up when you build the docker containers.

## Build Containers
-> inside the fine_app-Folder
`docker compose build`

## Run Containers in Docker
-> inside the fine_app-Folder
`docker compose up`

## Tear down Containers in Docker
-> inside the fine_app-Folder
`docker compose down`

## To be able to edit files, add volume to compose file
volumes: ['./:/usr/src/app']

# BACKEND SPECIFIC: START NODE.JS-SERVER WITH REMOTE DATABASE (E.G. MONGODB ATLAS)

IMPORTANT: change link from docker-mongoDB to link to e.g. MongoDB-Atlas in app.js in line 14

## Project setup 
-> inside the fine_backend-Folder
`npm install`

## Start the Node-Server
-> inside the fine_backend-Folder with nodemon
`npm run start`

## Start the Node-Server with hot-reloads for development
-> inside the fine_backend-Folder with nodemon
`npm run dev`

