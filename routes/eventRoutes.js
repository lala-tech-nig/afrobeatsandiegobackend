const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const upload = require('../middleware/upload'); // Import multer middleware


// Multiple fields with custom field names
const multiUpload = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'thumnail', maxCount: 1 }
]);

router.post('/', multiUpload, eventController.createEvent); // ✅ make sure createEvent exists
router.get('/', eventController.getEvents);
router.put('/:id/status', eventController.toggleEventStatus);

module.exports = router;
