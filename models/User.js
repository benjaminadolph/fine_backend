const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  birthDate: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  modulesSelected: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ModulesSelected',
  }],
  emotions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Emotions',
  }],
  symptoms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Symptoms',
  }],
  symptomsCategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SymptomsCategories',
  }],
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }],
});

module.exports = mongoose.model('User', UserSchema);
