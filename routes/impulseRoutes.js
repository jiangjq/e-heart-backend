const express = require('express');
const router = express.Router();
const impulseController = require('../controllers/impulsController');

// Define routes
router.get('/impulse-strategies', impulseController.getAllImpulseStrategyByUid);
router.post('/impulse-strategies', impulseController.createImpulseStrategy);

router.get('/impulse-records', impulseController.getAllImpulseRecordByUid);
router.post('/impulse-records', impulseController.createImpulseRecord);
router.post('/impulse-records-exp', impulseController.updateImpulseResponseExperience);

router.get('/impulse-reflection-records', impulseController.getRecordsRelatedToCurrentReflection);
router.post('/impulse-reflection', impulseController.updateImpulseRecordReflection);

module.exports = router;