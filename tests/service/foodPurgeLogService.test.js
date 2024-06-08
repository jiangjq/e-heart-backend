const FoodPurgeLogService = require('../../services/foodPurgeLogService');
const FoodPurgeLogDao = require('../../daos/foodPurgeLogDao');

// Mock the FoodPurgeLog DAO
jest.mock('../../daos/foodPurgeLogDao');

describe('FoodPurgeLogService', () => {
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
    FoodPurgeLogDao.createFoodPurgeLog.mockResolvedValue(foodPurgeLogData);
    const foodPurgeLog = await FoodPurgeLogService.createFoodPurgeLog(foodPurgeLogData);
    expect(foodPurgeLog).toEqual(foodPurgeLogData);
  });

  it('should get all food purge logs', async () => {
    FoodPurgeLogDao.getAllFoodPurgeLogs.mockResolvedValue([foodPurgeLogData]);
    const foodPurgeLogs = await FoodPurgeLogService.getAllFoodPurgeLogs();
    expect(foodPurgeLogs).toEqual([foodPurgeLogData]);
  });

  it('should get a food purge log by ID', async () => {
    FoodPurgeLogDao.getFoodPurgeLogById.mockResolvedValue(foodPurgeLogData);
    const foodPurgeLog = await FoodPurgeLogService.getFoodPurgeLogById(1);
    expect(foodPurgeLog).toEqual(foodPurgeLogData);
  });

  it('should update a food purge log', async () => {
    FoodPurgeLogDao.updateFoodPurgeLog.mockResolvedValue({ ...foodPurgeLogData, emotion_intensity: 3 });
    const foodPurgeLog = await FoodPurgeLogService.updateFoodPurgeLog(1, { emotion_intensity: 3 });
    expect(foodPurgeLog.emotion_intensity).toEqual(3);
  });

  it('should delete a food purge log', async () => {
    FoodPurgeLogDao.deleteFoodPurgeLog.mockResolvedValue(true);
    const result = await FoodPurgeLogService.deleteFoodPurgeLog(1);
    expect(result).toBe(true);
  });
});
