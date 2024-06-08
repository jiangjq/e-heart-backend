const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const DietLogService = require('../../services/dietLogService');
const dietLogRoutes = require('../../routes/dietLogRoutes');
const app = express();

app.use(bodyParser.json());
app.use('/api/diet_logs', dietLogRoutes);

// Mock the DietLogService
jest.mock('../../services/dietLogService');

describe('DietLogController', () => {
  const dietLogData = {
    id: 1,
    user_id: 1,
    eating_time: '12:00:00',
    food_details: 'Test Food',
    emotion_intensity: 5,
    emotion_type: 'Happy',
    eating_location: 'Home',
    specific_location: 'Kitchen',
    dieting: false,
    binge_eating: false,
    trigger: 'Boredom',
    additional_info: 'No additional info',
  };

  it('should create a new diet log', async () => {
    DietLogService.createDietLog.mockResolvedValue(dietLogData);
    const res = await request(app)
      .post('/api/diet_logs')
      .send(dietLogData);
    expect(res.status).toBe(201);
    expect(res.body).toEqual(dietLogData);
  });

  it('should get all diet logs', async () => {
    DietLogService.getAllDietLogs.mockResolvedValue([dietLogData]);
    const res = await request(app).get('/api/diet_logs');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([dietLogData]);
  });

  it('should get a diet log by ID', async () => {
    DietLogService.getDietLogById.mockResolvedValue(dietLogData);
    const res = await request(app).get('/api/diet_logs/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(dietLogData);
  });

  it('should update a diet log', async () => {
    DietLogService.updateDietLog.mockResolvedValue({ ...dietLogData, food_details: 'Updated Food' });
    const res = await request(app)
      .put('/api/diet_logs/1')
      .send({ food_details: 'Updated Food' });
    expect(res.status).toBe(200);
    expect(res.body.food_details).toEqual('Updated Food');
  });

  it('should delete a diet log', async () => {
    DietLogService.deleteDietLog.mockResolvedValue(true);
    const res = await request(app).delete('/api/diet_logs/1');
    expect(res.status).toBe(204);
  });
});
