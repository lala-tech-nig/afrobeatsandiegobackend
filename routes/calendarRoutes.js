const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');

router.get('/', calendarController.getEvents); // or .getCalendarEvents if renamed
router.post('/', calendarController.createEvent);
router.put('/:id/status', calendarController.toggleEventStatus);

module.exports = router;
