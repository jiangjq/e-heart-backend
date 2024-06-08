const DietLogReflectionService = require('../../services/dietLogReflectionService');
const DietLogReflectionDao = require('../../daos/dietLogReflectionDao');

// Mock the DietLogReflection DAO
jest.mock('../../daos/dietLogReflectionDao');

describe('DietLogReflectionService', () => {
  const dietLogReflectionData = {
    id: 1,
    user_id: 1,
    reflection_date: '2023-01-01',
    goal_met: true,
    reason_for_not_meeting_goal: 'Reason',
    strategy_for_not_meeting_goal: 'Strategy',
  };

  it('should create a new diet log reflection', async () => {
    DietLogReflectionDao.createDietLogReflection.mockResolvedValue(dietLogReflectionData);
    const dietLogReflection = await DietLogReflectionService.createDietLogReflection(dietLogReflectionData);
    expect(dietLogReflection).toEqual(dietLogReflectionData);
  });

  it('should get all diet log reflections', async () => {
    DietLogReflectionDao.getAllDietLogReflections.mockResolvedValue([dietLogReflectionData]);
    const dietLogReflections = await DietLogReflectionService.getAllDietLogReflections();
    expect(dietLogReflections).toEqual([dietLogReflectionData]);
  });

  it('should get a diet log reflection by ID', async () => {
    DietLogReflectionDao.getDietLogReflectionById.mockResolvedValue(dietLogReflectionData);
    const dietLogReflection = await DietLogReflectionService.getDietLogReflectionById(1);
    expect(dietLogReflection).toEqual(dietLogReflectionData);
  });

  it('should update a diet log reflection', async () => {
    DietLogReflectionDao.updateDietLogReflection.mockResolvedValue({ ...dietLogReflectionData, goal_met: false });
    const dietLogReflection = await DietLogReflectionService.updateDietLogReflection(1, { goal_met: false });
    expect(dietLogReflection.goal_met).toEqual(false);
  });

  it('should delete a diet log reflection', async () => {
    DietLogReflectionDao.deleteDietLogReflection.mockResolvedValue(true);
    const result = await DietLogReflectionService.deleteDietLogReflection(1);
    expect(result).toBe(true);
  });
});
