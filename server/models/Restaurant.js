const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  position:    Number,
  title:       { type: String, required: true, index: true },
  address:     String,
  ville:       { type: String, index: true },
  latitude:    Number,
  longitude:   Number,
  rating:      { type: Number, index: true },
  ratingCount: Number,
  priceLevel:  [String],
  type:        [String],
  category:    [String],
  ambiance:    [String],
  halal:       String,
  Vegetarien:  Boolean,
  enfant:      Boolean,
  phoneNumber: String,
  website:     String,
  cid:         String,
}, { timestamps: true });

// Index texte pour la recherche
restaurantSchema.index({ title: 'text', address: 'text' });

module.exports = mongoose.model('Restaurant', restaurantSchema);
