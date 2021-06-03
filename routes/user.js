const express = require('express');
const bcrypt = require('bcryptjs');
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

// UPDATE USER MODULES
router.patch('/modulesSelected/:userId', verify, async (req, res) => {
  const user = req.params.userId;
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
  }
});

// UPDATE WHOLE USER
router.patch('/:userId', verify, async (req, res) => {
  const user = req.params.userId;
  if (req.body.password) {
    // HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
  }
  try {
    await User.updateOne(
      { _id: user },
      { $set: req.body },
    );
    await User.findOne({ _id: user })
      .then((result) => {
        res.json(result);
      });
  } catch (err) {
    res.json(err);
  }
});

// DELETE A USER
router.delete('/:userId', verify, async (req, res) => {
  const user = req.params.userId;
  try {
    const removedUser = await User.deleteOne({ _id: user });
    res.json(removedUser);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
