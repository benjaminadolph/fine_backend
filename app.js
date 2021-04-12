//Import Express
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
require('dotenv/config')

//Import Routes
const postsRoute = require('./routes/posts')

//CONNECT TO DB
mongoose.Promise = global.Promise;
// use process.env.DB_CONNECTION instead of 'mongodb://mongo:27017/node-server' when using a mongodb hostet on a server e.g. MongoDB Atlas and change the Link in .env-File
mongoose.connect('mongodb://mongo:27017/fine', {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected sucessfully !')
    },
    error => {
        console.log('Database could not be connected : ' + error)
    }
)

//Execute Express
const app = express()

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/public/')));

// function that executes when routes are being hit e.g. the Homepage "/"
app.use('/posts', postsRoute)

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

//define Port - Port for Server || Port for Localhost
const port = process.env.PORT || 3000

//Start Server
app.listen(port, () => console.log(`Server started on port ${port}`))