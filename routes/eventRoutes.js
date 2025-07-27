const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.post('/', eventController.createEvent); // ✅ make sure createEvent exists
router.get('/', eventController.getEvents);
router.put('/:id/status', eventController.toggleEventStatus);

module.exports = router;
