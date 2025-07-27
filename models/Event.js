const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  time: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  thumnail: { type: String },
  date: { type: Date, required: true },
  isPosted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);