const mongoose = require('mongoose');

const SymptomCategorySchema = mongoose.Schema({
  userid: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  title: {
    type: String,
  },
});

module.exports = mongoose.model('SymptomCategory', SymptomCategorySchema);
