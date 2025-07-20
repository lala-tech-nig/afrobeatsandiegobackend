const Carousel = require('../models/Carousel');

// Upload multiple images (up to 3), with optional single replacements
exports.uploadImages = async (req, res) => {
  try {
    const imageFiles = req.files;

    if (!imageFiles || imageFiles.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    const imagePaths = imageFiles.map(file => file.path);
    const newEntry = await Carousel.create({ images: imagePaths });

    res.status(201).json({ message: 'Images uploaded successfully', data: newEntry });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update a single image from the existing carousel
exports.updateSingleImage = async (req, res) => {
  try {
    const { id, index } = req.params;
    const imageFile = req.file;

    const carousel = await Carousel.findById(id);
    if (!carousel) return res.status(404).json({ message: 'Carousel entry not found' });

    if (index < 0 || index >= carousel.images.length) {
      return res.status(400).json({ message: 'Invalid image index' });
    }

    carousel.images[index] = imageFile.path;
    await carousel.save();

    res.json({ message: 'Image updated', data: carousel });
  } catch (err) {
    res.status(500).json({ message: 'Error updating image', error: err.message });
  }
};

// Publish carousel with confetti trigger
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
