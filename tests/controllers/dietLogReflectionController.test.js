const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const DietLogReflectionService = require('../../services/dietLogReflectionService');
const dietLogReflectionRoutes = require('../../routes/dietLogReflectionRoutes');
const app = express();

app.use(bodyParser.json());
app.use('/api/diet_log_reflections', dietLogReflectionRoutes);

// Mock the DietLogReflectionService
jest.mock('../../services/dietLogReflectionService');

describe('DietLogReflectionController', () => {
  const dietLogReflectionData = {
    id: 1,
    user_id: 1,
    reflection_date: '2023-01-01',
    goal_met: true,
    reason_for_not_meeting_goal: 'Reason',
    strategy_for_not_meeting_goal: 'Strategy',
  };

  it('should create a new diet log reflection', async () => {
    DietLogReflectionService.createDietLogReflection.mockResolvedValue(dietLogReflectionData);
    const res = await request(app)
      .post('/api/diet_log_reflections')
      .send(dietLogReflectionData);
    expect(res.status).toBe(201);
    expect(res.body).toEqual(dietLogReflectionData);
  });

  it('should get all diet log reflections', async () => {
    DietLogReflectionService.getAllDietLogReflections.mockResolvedValue([dietLogReflectionData]);
    const res = await request(app).get('/api/diet_log_reflections');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([dietLogReflectionData]);
  });

  it('should get a diet log reflection by ID', async () => {
    DietLogReflectionService.getDietLogReflectionById.mockResolvedValue(dietLogReflectionData);
    const res = await request(app).get('/api/diet_log_reflections/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(dietLogReflectionData);
  });

  it('should update a diet log reflection', async () => {
    DietLogReflectionService.updateDietLogReflection.mockResolvedValue({ ...dietLogReflectionData, goal_met: false });
    const res = await request(app)
      .put('/api/diet_log_reflections/1')
      .send({ goal_met: false });
    expect(res.status).toBe(200);
    expect(res.body.goal_met).toEqual(false);
  });

  it('should delete a diet log reflection', async () => {
    DietLogReflectionService.deleteDietLogReflection.mockResolvedValue(true);
    const res = await request(app).delete('/api/diet_log_reflections/1');
    expect(res.status).toBe(204);
  });
});
