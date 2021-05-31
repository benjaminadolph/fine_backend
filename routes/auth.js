const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = require('../models/User');

// IMPORT VALIDATIONS
const { registerValidation, loginValidation } = require('../validation');

// USER REGISTRIEREN
router.post('/register', async (req, res) => {
  // VALIDATE DATA BEFORE CREATING THE USER
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // CHECK IF USER EXITS IN DATABASE
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    console.log('User already exists');
    return res.status(400).send('email already exists');
  }

  // HASH THE PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // CREATE A NEW USER
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    birthDate: req.body.birthDate,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    // eslint-disable-next-line no-unused-vars
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// USER LOGIN
router.post('/login', async (req, res) => {
  // VALIDATE DATA BEFORE CREATING THE USER
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // CHECK IF USER EXITS IN DATABASE
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('email or password is wrong');

  // CHECK IF PASSWORD IS CORRECT
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('password is wrong');

  // CREATE AND ASSIGN TOKEN
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
  res.json({
    id: user._id,
    authtoken: token,
  });
});

module.exports = router;
