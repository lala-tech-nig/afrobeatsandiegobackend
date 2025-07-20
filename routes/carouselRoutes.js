const express = require('express');
const router = express.Router();
const carouselController = require('../controllers/carouselController');

router.post('/', carouselController.createCarousel);
router.get('/', carouselController.getCarousels);
router.put('/:id/status', carouselController.toggleCarouselStatus);

module.exports = router;
