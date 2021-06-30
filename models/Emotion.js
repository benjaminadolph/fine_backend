const mongoose = require('mongoose');

const EmotionSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  module: {
    type: String,
    required: true,
  },
  intensity: {
    type: Number,
    required: true,
  },
  emotion: [{
    type: String,
  }],
  photos: [{
    type: String,
  }],
  audio: [{
    type: String,
  }],
  detailsText: {
    type: String,
  },
  tags: [{
    type: String,
  }],
});

module.exports = mongoose.model('Emotion', EmotionSchema);
