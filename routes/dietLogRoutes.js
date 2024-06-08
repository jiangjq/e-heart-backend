const express = require('express');
const router = express.Router();
const dietLogController = require('../controllers/dietLogController');

router.get('/', dietLogController.getAllDietLogs);
router.get('/:id', dietLogController.getDietLogById);
router.post('/', dietLogController.createDietLog);
router.put('/:id', dietLogController.updateDietLog);
router.delete('/:id', dietLogController.deleteDietLog);

module.exports = router;
