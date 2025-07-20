const mongoose = require('mongoose');

const bookCallSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  selectedService: { type: String },
  isHandled: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BookCall', bookCallSchema);
