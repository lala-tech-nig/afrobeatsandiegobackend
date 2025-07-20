const mongoose = require('mongoose');

const poppinSchema = new mongoose.Schema({
  title: { type: String, required: true },
  photoUrl: { type: String },
  news: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Poppin', poppinSchema);
