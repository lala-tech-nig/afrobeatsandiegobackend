const Poppin = require('../models/Poppin');

// Create a new poppin post
exports.createPoppin = async (req, res) => {
  try {
    const { title, body, image, tags } = req.body;

    const poppin = new Poppin({
      title,
      body,
      image,
      tags,
    });

    await poppin.save();

    res.status(201).json({ message: 'Poppin post created successfully', data: poppin });
  } catch (error) {
    res.status(500).json({ message: 'Error creating poppin post', error: error.message });
  }
};

// List all poppin posts
exports.getPoppins = async (req, res) => {
  try {
    const posts = await Poppin.find().sort({ createdAt: -1 });
    res.json({ data: posts });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching poppins', error: error.message });
  }
};

exports.togglePoppinStatus = async (req, res) => {
  res.json({ message: 'Toggle status endpoint' });
};
