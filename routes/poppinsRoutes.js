const express = require('express');
const router = express.Router(); // ✅ correct
const poppinsController = require('../controllers/poppinsController');

// Route for creating a new poppin
router.post('/', poppinsController.createPoppin);

// Route for getting all poppins
router.get('/', poppinsController.getPoppins);

// Route for updating a poppin's status
router.put('/:id/status', poppinsController.togglePoppinStatus);

module.exports = router;
