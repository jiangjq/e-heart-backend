const express = require('express');
const router = express.Router();
const foodPurgeLogController = require('../controllers/foodPurgeLogController');

router.get('/', foodPurgeLogController.getAllFoodPurgeLogs);
router.get('/:id', foodPurgeLogController.getFoodPurgeLogById);
router.post('/', foodPurgeLogController.createFoodPurgeLog);
router.put('/:id', foodPurgeLogController.updateFoodPurgeLog);
router.delete('/:id', foodPurgeLogController.deleteFoodPurgeLog);

module.exports = router;
