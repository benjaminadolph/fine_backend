# PROJECT SETUP
This repository contains the backend. The frontend is located in a separate repository. This allows independent versioning of frontend and backend.

On your computer the final structure with both repositories in one folder should look like this:
```	
fine_app
├── fine_backend
├── fine_frontend
```

# BACKEND SPECIFIC: START DOCKER WITH NODE.JS-SERVER AND MONGODB
The Project is automatically set up when you build the docker containers.

## Build Containers
-> inside the fine_backend-Folder
`docker-compose build`

## Run Containers in Docker
-> inside the fine_backend-Folder
`docker-compose up`

## Tear down Containers in Docker
-> inside the fine_backend-Folder
`docker-compose down`

## To be able to edit files, add volume to compose file
volumes: ['./:/usr/src/app']

# BACKEND SPECIFIC: START NODE.JS-SERVER WITH REMOTE DATABASE (E.G. MONGODB ATLAS)

IMPORTANT: change link from 'mongodb://user1:test123@mongo:27017/fine_mongodb' to process.env.DB_CONNECTION in app.js in line 14 and set the correct address in the .env-file to use e.g. MongoDB-Atlas
## Project setup 
-> inside the fine_backend-Folder
`npm install`

## Start the Node-Server
-> inside the fine_backend-Folder
`npm run start`

## Start the Node-Server with hot-reloads for development
-> inside the fine_backend-Folder with nodemon
`npm run dev`

# ESLINT
You can manually lint with `npm run lint`
Lint specifications in detail: https://github.com/airbnb/javascript 

## Autofix Problems, Style and Syntax with ESLINT 
-> inside the fine_backend-Folder
`npm run lint --fix`