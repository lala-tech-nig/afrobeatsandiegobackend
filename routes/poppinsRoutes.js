const express = require('express');
const router = express.Router();
const poppinsController = require('../controllers/poppinsController');

router.post('/', poppinsController.createPoppins);
router.get('/', poppinsController.getPoppinsEntries);
router.delete('/:id', poppinsController.deletePoppins);

module.exports = router;
