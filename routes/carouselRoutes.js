const express = require('express');
const router = express.Router();
const carouselController = require('../controllers/carouselController');
const upload = require('../middleware/upload');

router.post('/bulk', upload.array('images', 3), carouselController.uploadCarousels); // POST /api/carousel/bulk

router.get('/', carouselController.getCarousels);
// Publish carousel
router.put('/:id/publish', carouselController.publishCarousel);

module.exports = router;
