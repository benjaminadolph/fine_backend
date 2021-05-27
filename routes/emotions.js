const express = require('express');
const multer = require('multer');
const path = require('path');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const Emotion = require('../models/Emotion');
const User = require('../models/User');
const verify = require('./verifyToken');

const router = express.Router();

// Create storage engine
const storage = new GridFsStorage({
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
const upload = multer({ storage });

// IMPORT VALIDATIONS
// TODO: ADD VALIDATION
/* const { emotionsValidation } = require('../validation'); */

// Gets all Emotions
router.get('/', verify, async (req, res) => {
  const id = req.query.userid;
  try {
    User.findOne({ _id: id })
      .populate('emotions')
      .then((result) => {
        res.json(result.emotions);
      });
  } catch (err) {
    res.json(err);
  }
});

// Submits a Emotion
router.post('/', verify, upload.single('emotionImage'), async (req, res) => {
  // TODO: ADD VALIDATION
  /* const { error } = emotionsValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message); */

  const emotion = new Emotion({
    userid: req.body.userid,
    date: req.body.date,
    module: req.body.module,
    intensity: req.body.intensity,
    title: req.body.title,
    detailsText: req.body.detailsText,
    tags: req.body.tags,
    // TODO: Fileupload
  });
  try {
    // emotion.photos.push(req.file.id);
    const savedEmotion = await emotion.save();
    User.findOne({ _id: emotion.userid }, (err, user) => {
      if (user) {
        // The below two lines will add the newly saved emotion
        // ObjectID to the the User's emotion array
        user.emotions.push(savedEmotion);
        user.save();
      }
    });
    res.json(savedEmotion);
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});

// Delete a specific Emotion
router.delete('/:emotionId', verify, async (req, res) => {
  const emotion = req.params.emotionId;
  const user = req.query.userid;
  try {
    await Emotion.deleteOne({ _id: emotion });
    await User.updateOne(
      { _id: user },
      { $pull: { emotions: emotion } },
    );
    await User.findOne({ _id: user })
      .populate('emotions')
      .then((result) => {
        res.json(result.emotions);
      });
  } catch (err) {
    res.json(err);
  }
});

// Update a specific Emotion
router.patch('/:emotionId', verify, async (req, res) => {
  const user = req.query.userid;
  try {
    await Emotion.updateOne(
      { _id: req.params.emotionId },
      { $set: req.body },
    );
    await User.findOne({ _id: user })
      .populate('emotions')
      .then((result) => {
        res.json(result.emotions);
      });
  } catch (err) {
    res.json(err);
  }
});

// Get back a specific Emotion
router.get('/:emotionId', verify, async (req, res) => {
  try {
    const specificEmotion = await Emotion.findById(req.params.emotionId);
    res.json(specificEmotion);
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
