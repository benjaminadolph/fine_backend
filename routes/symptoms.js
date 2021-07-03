const express = require('express');
/* const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto'); */
const Symptom = require('../models/Symptom');
const User = require('../models/User');
const verify = require('./verifyToken');

const router = express.Router();

// Create storage engine
/* const storage = new GridFsStorage({
  // use process.env.DB_CONNECTION instead of process.env.DOCKER_DB_CONNECTION
  // when using a mongodb hostet on e.g. MongoDB Atlas and change the Link in .env-File
  url: process.env.DB_CONNECTION,
  file: (req, file) => new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, buf) => {
      if (err) {
        return reject(err);
      }
      const filename = buf.toString('hex') + path.extname(file.originalname);
      const fileInfo = {
        filename,
        bucketName: 'uploads',
      };
      resolve(fileInfo);
    });
  }),
});
const upload = multer({ storage }); */

// IMPORT VALIDATIONS
/* const { symptomsValidation } = require('../validation'); */

// Gets all symptoms
router.get('/', verify, async (req, res) => {
  const id = req.query.userid;
  try {
    User.findOne({ _id: id })
      .populate('symptoms')
      .then((result) => {
        res.json(result.symptoms);
      });
  } catch (err) {
    res.json(err);
  }
});

// Submits a symptom
router.post('/', verify, /* upload.single('symptomImage'), */ async (req, res) => {
/*   const { error } = symptomsValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message); */

  const symptom = new Symptom({
    userid: req.body.userid,
    date: req.body.date,
    module: req.body.module,
    intensity: req.body.intensity,
    category: req.body.category,
    location: req.body.location,
    detailsText: req.body.detailsText,
    tags: req.body.tags,
    // TODO: Fileupload
  });
  try {
    // symptom.photos.push(req.file.id);
    const savedSymptom = await symptom.save();
    User.findOne({ _id: symptom.userid }, (err, user) => {
      if (user) {
        // The below two lines will add the newly saved emotion
        // ObjectID to the the User's emotion array
        user.symptoms.push(savedSymptom);
        user.save();
      }
    });
    res.json(savedSymptom);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// Delete a specific symptom
router.delete('/:symptomId', verify, async (req, res) => {
  const symptom = req.params.symptomId;
  const user = req.query.userid;
  try {
    await Symptom.deleteOne({ _id: symptom });
    await User.updateOne(
      { _id: user },
      { $pull: { symptoms: symptom } },
    );
    await User.findOne({ _id: user })
      .populate('symptoms')
      .then((result) => {
        res.json(result.symptoms);
      });
  } catch (err) {
    res.json(err);
  }
});

// Update a specific symptom
router.patch('/:symptomId', verify, async (req, res) => {
  const user = req.query.userid;
  try {
    await Symptom.updateOne(
      { _id: req.params.symptomId },
      { $set: req.body },
    );
    await User.findOne({ _id: user })
      .populate('symptoms')
      .then((result) => {
        res.json(result.symptoms);
      });
  } catch (err) {
    res.json(err);
  }
});

// Get back a specific symptom
router.get('/:symptomId', verify, async (req, res) => {
  try {
    const specificSymptom = await Symptom.findById(req.params.symptomId);
    res.json(specificSymptom);
  } catch (err) {
    res.json(err);
  }
});

// @route GET /image/:filename
// @desc Display Image
/* app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists',
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image',
      });
    }
  });
}); */

module.exports = router;
