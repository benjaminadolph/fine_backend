// Import Express
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// Import Routes
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/auth');
const symptomCategoriesRoute = require('./routes/symptomCategories');
const symptomsRoute = require('./routes/symptoms');
const emotionsRoute = require('./routes/emotions');

// CONNECT TO DB
mongoose.Promise = global.Promise;
// use process.env.DB_CONNECTION instead of 'mongodb://user1:test123@mongo:27017/fine_mongodb' when using a mongodb hostet on e.g. MongoDB Atlas and change the Link in .env-File
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected sucessfully !');
  },
  (error) => {
    console.log(`Database could not be connected : ${error}`);
  });

// Execute Express
const app = express();

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/public/')));

// ROUTES MIDDLEWARE
// function that executes when routes are being hit e.g. the Homepage "/"
app.use('/api/symptomCategories', symptomCategoriesRoute);
app.use('/api/emotions', emotionsRoute);
app.use('/api/symptoms', symptomsRoute);
app.use('/api/posts', postsRoute);
app.use('/api/user', authRoute);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// define Port - Port for Server || Port for Localhost
const port = process.env.PORT || 3000;

// Start Server
app.listen(port, () => console.log(`Server started on port ${port}`));
