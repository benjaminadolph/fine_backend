// Import Express
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const methodOverride = require('method-override');
const Grid = require('gridfs-stream');

dotenv.config();

// CONNECT TO DB
mongoose.Promise = global.Promise;
/** ******
use process.env.DB_CONNECTION instead of process.env.DOCKER_DB_CONNECTION
when using a mongodb hostet on e.g. MongoDB Atlas and change the Link in .env-File
IMPORTANT: You also have to change it in the symptoms.js and emotions.js files in line 16
otherwise the server will crash
********* */
// eslint-disable-next-line max-len
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected sucessfully !');
  },
  (error) => {
    console.log(`Database could not be connected : ${error}`);
  });

const conn = mongoose.connection;
conn.once('open', () => {
  // initialize stream to mongodb
  const gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Import Routes
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/auth');
const symptomCategoriesRoute = require('./routes/symptomCategories');
const symptomsRoute = require('./routes/symptoms');
const emotionsRoute = require('./routes/emotions');
const userRoute = require('./routes/user');

// Execute Express
const app = express();

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '/public/')));

// ROUTES MIDDLEWARE
// function that executes when routes are being hit e.g. the Homepage "/"
app.use('/api/auth', authRoute);
app.use('/api/symptomCategories', symptomCategoriesRoute);
app.use('/api/emotions', emotionsRoute);
app.use('/api/user', userRoute);
app.use('/api/symptoms', symptomsRoute);
app.use('/api/posts', postsRoute);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// define Port - Port for Server ||??Port for Localhost
const port = process.env.PORT ||??3000;

// Start Server
app.listen(port, () => console.log(`Server started on port ${port}`));
