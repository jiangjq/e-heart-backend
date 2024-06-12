const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const FoodPurgeLogService = require('../../services/foodPurgeLogService');
const foodPurgeLogRoutes = require('../../routes/foodPurgeLogRoutes');
const app = express();

app.use(bodyParser.json());
app.use('/api/food_purge_logs', foodPurgeLogRoutes);

// Mock the FoodPurgeLogService
jest.mock('../../services/foodPurgeLogService');

describe('FoodPurgeLogController', () => {
  const foodPurgeLogData = {
    id: 1,
    user_id: 1,
    time: '12:00:00',
    emotion_intensity: 5,
    emotion_type: 'Happy',
    trigger: 'Boredom',
    additional_info: 'No additional info',
  };

  it('should create a new food purge log', async () => {
    FoodPurgeLogService.createFoodPurgeLog.mockResolvedValue(foodPurgeLogData);
    const res = await request(app)
      .post('/api/food_purge_logs')
      .send(foodPurgeLogData);
    expect(res.status).toBe(201);
    expect(res.body).toEqual(foodPurgeLogData);
  });

  it('should get all food purge logs', async () => {
    FoodPurgeLogService.getAllFoodPurgeLogs.mockResolvedValue([foodPurgeLogData]);
    const res = await request(app).get('/api/food_purge_logs');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([foodPurgeLogData]);
  });

  it('should get a food purge log by ID', async () => {
    FoodPurgeLogService.getFoodPurgeLogById.mockResolvedValue(foodPurgeLogData);
    const res = await request(app).get('/api/food_purge_logs/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(foodPurgeLogData);
  });

  it('should update a food purge log', async () => {
    FoodPurgeLogService.updateFoodPurgeLog.mockResolvedValue({ ...foodPurgeLogData, emotion_intensity: 3 });
    const res = await request(app)
      .put('/api/food_purge_logs/1')
      .send({ emotion_intensity: 3 });
    expect(res.status).toBe(200);
    expect(res.body.emotion_intensity).toEqual(3);
  });

  it('should delete a food purge log', async () => {
    FoodPurgeLogService.deleteFoodPurgeLog.mockResolvedValue(true);
    const res = await request(app).delete('/api/food_purge_logs/1');
    expect(res.status).toBe(204);
  });
});
