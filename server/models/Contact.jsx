const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  sujet: {
    type: String
  },
  message: {
    type: String,
    required: true
  },
  statut: {
    type: String,
    enum: ['nouveau', 'en_cours', 'traité'],
    default: 'nouveau'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);
