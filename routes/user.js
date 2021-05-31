const express = require('express');
const verify = require('./verifyToken');

const router = express.Router();
const User = require('../models/User');

// GETS BACK A SPECIFIC USER BY ID
router.get('/:userId', verify, async (req, res) => {
  try {
    const specificUser = await User.findById(req.params.userId);
    res.json(specificUser);
  } catch (err) {
    res.json(err);
  }
});

// Update a specific symptom
router.patch('/modulesSelected', verify, async (req, res) => {
  const user = req.query.userid;
  try {
    await User.updateOne(
      { _id: user },
      { $set: req.body },
    );
    await User.findOne({ _id: user })
      .then((result) => {
        res.json(result.modulesSelected);
      });
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});

module.exports = router;
