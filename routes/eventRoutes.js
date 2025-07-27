// const express = require('express');
// const router = express.Router();
// const eventController = require('../controllers/eventController');
// const upload = require('../middleware/upload'); // Import multer middleware


// // Multiple fields with custom field names
// const multiUpload = upload.fields([
//   { name: 'image', maxCount: 1 },
//   { name: 'thumnail', maxCount: 1 }
// ]);

// router.post('/', multiUpload, eventController.createEvent); // ✅ make sure createEvent exists
// router.get('/', eventController.getEvents);
// router.put('/:id/status', eventController.toggleEventStatus);

// module.exports = router;


const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer Storage Setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

// Init multer with fields for both images
const upload = multer({ storage });

router.post(
  '/',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'thumnail', maxCount: 1 }
  ]),
  eventController.createEvent
);

router.get('/', eventController.getEvents);
router.patch('/:id/toggle', eventController.toggleEventStatus);

module.exports = router;
