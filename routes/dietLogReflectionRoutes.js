const express = require('express');
const router = express.Router();
const dietLogReflectionController = require('../controllers/dietLogReflectionController');

router.get('/', dietLogReflectionController.getAllDietLogReflections);
router.get('/:id', dietLogReflectionController.getDietLogReflectionById);
router.post('/', dietLogReflectionController.createDietLogReflection);
router.put('/:id', dietLogReflectionController.updateDietLogReflection);
router.delete('/:id', dietLogReflectionController.deleteDietLogReflection);

module.exports = router;
