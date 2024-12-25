const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  article: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Article', articleSchema);