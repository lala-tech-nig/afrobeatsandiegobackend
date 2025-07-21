const express = require('express');
const router = express.Router();
const carouselController = require('../controllers/carouselController');

// Upload new carousel
router.post('/', carouselController.uploadImages);

// Update a single image in carousel
router.put('/:id/image/:index', carouselController.updateSingleImage);

// Publish carousel
router.put('/:id/publish', carouselController.publishCarousel);

module.exports = router;
