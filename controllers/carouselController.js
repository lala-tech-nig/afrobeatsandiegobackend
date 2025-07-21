

const Carousel = require('../models/Carousel');
const path = require('path');

// Handle bulk upload
exports.uploadCarousels = async (req, res) => {
  try {
    const existingCount = await Carousel.countDocuments();
    const files = req.files;

    if (!files || files.length !== 3) {
      return res.status(400).json({ message: 'Exactly 3 images must be uploaded.' });
    }

    if (existingCount + files.length > 3) {
      return res.status(400).json({ message: 'You can only have up to 3 carousel images in total.' });
    }

    const imagesToSave = files.map(file => ({
      imageUrl: `/uploads/${file.filename}`
    }));

    const savedImages = await Carousel.insertMany(imagesToSave);
    res.status(201).json(savedImages);
  } catch (err) {
    console.error('Upload failed:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.publishCarousel = async (req, res) => {
  try {
    const { id } = req.params;
    const entry = await Carousel.findById(id);

    if (!entry) return res.status(404).json({ message: 'Carousel not found' });

    entry.published = true;
    await entry.save();

    res.json({ message: 'Carousel published successfully', confetti: true });
  } catch (err) {
    res.status(500).json({ message: 'Error publishing carousel', error: err.message });
  }
};

exports.getCarousels = async (req, res) => {
  try {
    const carousels = await Carousel.find();
    res.json(carousels);
  } catch (err) {
    console.error('Error fetching carousels:', err);
    res.status(500).json({ message: 'Server error' });
  }
};