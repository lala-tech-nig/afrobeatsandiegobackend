const Carousel = require('../models/Carousel');
const fs = require('fs');
const path = require('path');

// Handle bulk upload
exports.uploadCarousels = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length !== 3) {
      return res.status(400).json({ message: 'Exactly 3 images must be uploaded.' });
    }

    // Find and delete last 3 images from DB and disk
    const existingImages = await Carousel.find().sort({ createdAt: -1 }).limit(3);
    for (const img of existingImages) {
      // Remove leading slash if present
      const relativePath = img.imageUrl.startsWith('/') ? img.imageUrl.slice(1) : img.imageUrl;
      const filePath = path.join(__dirname, '..', relativePath);
      fs.unlink(filePath, err => {
        if (err) console.warn(`Could not delete file: ${filePath}`);
      });
    }
    const existingIds = existingImages.map(img => img._id);
    if (existingIds.length > 0) {
      await Carousel.deleteMany({ _id: { $in: existingIds } });
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