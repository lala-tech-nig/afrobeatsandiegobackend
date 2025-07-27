const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');
const upload = require('../middleware/upload'); // Import multer middleware

router.get('/', calendarController.getEvents);
router.post('/', upload.single('image'), calendarController.createEvent); // Accept image upload
router.put('/:id/status', calendarController.toggleEventStatus);

module.exports = router;
