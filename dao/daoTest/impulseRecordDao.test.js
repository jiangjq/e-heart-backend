let expect
const ImpulseRecordDao = require('../impulseRecordDao');
const ImpulseRecord = require('../../models/impulseRecord');
const User = require('../../models/user')
const sequelize = require('../../utils/db');

describe('ImpulseRecord with real database', () => {
  let impulseRecordDao;
  let user1
  let user2
  before(async () => {
    await import("chai").then((result) => {
      expect = result.expect;
    });
    await sequelize.sync({ force: true }); // Sync all models that are not already in the database

    impulseRecordDao = new ImpulseRecordDao();
    user1 = await User.create( {name:'user1', email:'use1@email.com', password:'123', phone_number:'123456', height: '180', weight:'70', age:'18', current_progress:'current_progress'} )
    user2 = await User.create( {name:'user2', email:'use1@email.com', password:'123', phone_number:'123456', height: '180', weight:'70', age:'18', current_progress:'current_progress'} )
  });

  after(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    await ImpulseRecord.truncate();
  });

  it('should fetch all impulse record', async () => {
    await ImpulseRecord.create({ user_id: user1.id, impulse_type: 'impulse_type_1', time:'12:00:00', date:new Date('2024-06-05'), intensity:'0', trigger: 'trigger_1', plan: 'plan_1' });
    const impulsedRecords = await impulseRecordDao.getAllImpulseRecord();
    expect(impulsedRecords).to.be.an('array');
    expect(impulsedRecords[0].user_id).to.equal(user1.id);
  });

  it('should fetch all impulse record equal to a id and since a date', async () => {
    await ImpulseRecord.create({ user_id: user1.id, impulse_type: 'impulse_type_1', time:'12:00:00', date:new Date('2024-06-05'), intensity:'0', trigger: 'trigger', plan: 'plan' });
    var expectRecord = await ImpulseRecord.create({ user_id: '1', impulse_type: 'impulse_type_1', time:'12:00:00', date:new Date('2024-06-07'), intensity:'0', trigger: 'trigger', plan: 'plan' });
    await ImpulseRecord.create({ user_id: user2.id, impulse_type: 'impulse_type_1', time:'12:00:00', date:new Date('2024-06-10'), intensity:'0', trigger: 'trigger', plan: 'plan' });

    const impulsedRecords = await impulseRecordDao.getRecordsByIdAndSinceDate(1, new Date('2024-06-07'));
    expect(impulsedRecords).to.be.an('array').that.has.lengthOf(1);
    expect(impulsedRecords[0].user_id).to.equal(user1.id);
    expect(impulsedRecords[0].date.getTime()).to.equal(new Date('2024-06-07').getTime());
    expect(impulsedRecords[0].id).to.equal(expectRecord.id)
  });

});
