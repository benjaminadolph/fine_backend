const mongoose = require('mongoose');

const SymptomSchema = mongoose.Schema({
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
  },
  category: {
    type: String,
    required: true,
    // TODO: Verknüpfung zu SyptomCategory
    /* type: mongoose.Schema.Types.ObjectId,
    ref: 'SymptomsCategories',
    required: true, */
  },
  location: {
    front: {
      type: Boolean,
    },
    x: {
      type: Number,
    },
    y: {
      type: Number,
    },
    title: {
      type: String,
    }
  },
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

module.exports = mongoose.model('Symptom', SymptomSchema);
