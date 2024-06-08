const { sequelize, User, DietLog, FoodPurgeLog, DietLogReflection } = require('../../jest.setup');

beforeAll(async () => {
  await sequelize.authenticate();
  await sequelize.sync({ force: true }); // Ensure database is in a clean state
});

afterAll(async () => {
  await sequelize.close();
});

describe('User Model', () => {
  it('should have correct properties', () => {
    const user = User.build({});
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('phone_number');
    expect(user).toHaveProperty('height');
    expect(user).toHaveProperty('weight');
    expect(user).toHaveProperty('age');
    expect(user).toHaveProperty('birthday');
    expect(user).toHaveProperty('current_progress');
  });
});

describe('DietLog Model', () => {
  it('should have correct properties', () => {
    const dietLog = DietLog.build({});
    expect(dietLog).toHaveProperty('user_id');
    expect(dietLog).toHaveProperty('eating_time');
    expect(dietLog).toHaveProperty('food_details');
    expect(dietLog).toHaveProperty('emotion_intensity');
    expect(dietLog).toHaveProperty('emotion_type');
    expect(dietLog).toHaveProperty('eating_location');
    expect(dietLog).toHaveProperty('specific_location');
    expect(dietLog).toHaveProperty('dieting');
    expect(dietLog).toHaveProperty('binge_eating');
    expect(dietLog).toHaveProperty('trigger');
    expect(dietLog).toHaveProperty('additional_info');
  });
});

describe('FoodPurgeLog Model', () => {
  it('should have correct properties', () => {
    const foodPurgeLog = FoodPurgeLog.build({});
    expect(foodPurgeLog).toHaveProperty('user_id');
    expect(foodPurgeLog).toHaveProperty('time');
    expect(foodPurgeLog).toHaveProperty('emotion_intensity');
    expect(foodPurgeLog).toHaveProperty('emotion_type');
    expect(foodPurgeLog).toHaveProperty('trigger');
    expect(foodPurgeLog).toHaveProperty('additional_info');
  });
});

describe('DietLogReflection Model', () => {
  it('should have correct properties', () => {
    const dietLogReflection = DietLogReflection.build({});
    expect(dietLogReflection).toHaveProperty('user_id');
    expect(dietLogReflection).toHaveProperty('reflection_date');
    expect(dietLogReflection).toHaveProperty('goal_met');
    expect(dietLogReflection).toHaveProperty('reason_for_not_meeting_goal');
    expect(dietLogReflection).toHaveProperty('strategy_for_not_meeting_goal');
  });
});
