const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController'); // ✅

router.post('/', calendarController.createEvent); // ✅ make sure createEvent exists
router.get('/', calendarController.getEvents);
router.put('/:id/status', calendarController.toggleEventStatus);

module.exports = router;
