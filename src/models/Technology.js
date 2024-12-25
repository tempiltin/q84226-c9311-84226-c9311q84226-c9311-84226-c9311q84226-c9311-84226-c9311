const mongoose = require('mongoose');

const technologySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  logo: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return v.endsWith('.svg');
      },
      message: 'Logo must be in SVG format'
    }
  }
});

module.exports = mongoose.model('Technology', technologySchema);