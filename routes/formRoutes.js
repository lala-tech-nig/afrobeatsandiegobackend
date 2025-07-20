const express = require('express');
const router = express.Router();
const formsController = require('../controllers/formsController');

// Book a call
router.post('/book-call', formsController.createBookCall);
router.get('/book-call', formsController.getBookCalls);
router.put('/book-call/:id/status', formsController.toggleBookCallStatus);

// Let's connect
router.post('/lets-connect', formsController.createLetsConnect);
router.get('/lets-connect', formsController.getLetsConnects);
router.put('/lets-connect/:id/status', formsController.toggleLetsConnectStatus);

module.exports = router;
