const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,

  date: {
    type: Date,
    required: true
  },

  location: String,

  published: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Calendar', calendarSchema);
