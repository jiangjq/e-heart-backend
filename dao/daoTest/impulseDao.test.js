// run test : 
// npx mocha 'dao/daoTest/impulseDao.test.js'
let expect
const { ImpulseRecordDao, ImpulseRecordReflectionDao  } = require('../impulseDao');
const { ImpulseRecord, ImpulseRecordReflection } = require('../../models/impulse');
const User = require('../../models/user');
const sequelize = require('../../utils/db');

describe('ImpulseRecord with real database', () => {
  let impulseRecordDao;
  let impulseRecordReflectionDao;
  let user1
  let user2

  const addMockImpulseRecordReflection = async function(id, reflectionDate) {
    return await ImpulseRecordReflection.create({
      user_id: id, 
      reflection_date: reflectionDate, 
      record_impulses_immediately: true,
      reasons_not_record_impulses: 'a',
      strategies_not_record_impulses: 'a',
      use_alternatives: true,
      impulse_persistence_minutes: 5,
      impulse_persistence_barriers: 'a',
      impulse_persistence_methods: 'a',
      impulse_persistence_effects: 'a',
      impulse_persistence_improvement_areas: 'a'
      });
  };
  before(async () => {
    await import("chai").then((result) => {
      expect = result.expect;
    });
    impulseRecordDao = new ImpulseRecordDao();
    impulseRecordReflectionDao = new ImpulseRecordReflectionDao();
    
  });

  after(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true });
    await sequelize.sync({ force: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true });
    user1 = await User.create( {name:'user1', email:'use1@email.com', password:'123', phone_number:'123456', height: '180', weight:'70', age:'18', current_progress:'current_progress'} )
    user2 = await User.create( {name:'user2', email:'use1@email.com', password:'123', phone_number:'123456', height: '180', weight:'70', age:'18', current_progress:'current_progress'} )
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

    const impulsedRecords = await impulseRecordDao.getRecordsByIdAndSinceDate(user1.id, new Date('2024-06-07'));
    expect(impulsedRecords).to.be.an('array').that.has.lengthOf(1);
    expect(impulsedRecords[0].user_id).to.equal(user1.id);
    expect(impulsedRecords[0].date.getTime()).to.equal(new Date('2024-06-07').getTime());
    expect(impulsedRecords[0].id).to.equal(expectRecord.id)
  });


  it('should fetch latest impulse record reflection of a user id', async () => {
    await ImpulseRecordReflection.create({user_id: user1.id, 
      reflection_date: new Date('2024-06-01'), 
      record_impulses_immediately: true,
      use_alternatives: true,
      impulse_persistence_effects: 'a',
      impulse_persistence_improvement_areas: 'a'
      });
    var expectRecord = await ImpulseRecordReflection.create({
      user_id: user1.id, 
      reflection_date: new Date('2024-06-09'), 
      record_impulses_immediately: true,
      use_alternatives: true,
      impulse_persistence_effects: 'a',
      impulse_persistence_improvement_areas: 'a'
      });
    await ImpulseRecordReflection.create({
      user_id: user2.id, 
      reflection_date: new Date('2024-06-10'), 
      record_impulses_immediately: true,
      use_alternatives: true,
      impulse_persistence_effects: 'a',
      impulse_persistence_improvement_areas: 'a'
      });
    const impulseRecordReflection = await impulseRecordReflectionDao.getLatestImpulseRecordReflectionById(user1.id);
    expect(impulseRecordReflection).to.be.an.instanceOf(ImpulseRecordReflection);
    expect(impulseRecordReflection.user_id).to.equal(user1.id);
    expect(impulseRecordReflection.reflection_date.getTime()).to.equal(new Date('2024-06-09').getTime());
    expect(impulseRecordReflection.id).to.equal(expectRecord.id)
  });

  it('relationship between ImpulseRecord and ImpulseRecordReflection should work', async () => {
    var impulseRecord1 = await ImpulseRecord.create({ 
      user_id: user1.id, 
      impulse_type: 'impulse_type_1', 
      time:'12:00:00', 
      date:new Date('2024-06-05'), 
      intensity:'0', 
      trigger: 'trigger', 
      plan: 'plan' });
    
    var impulseRecord2 = await ImpulseRecord.create({ 
      user_id: user1.id, 
      impulse_type: 'impulse_type_1', 
      time:'12:00:00', 
      date:new Date('2024-06-05'), 
      intensity:'0', 
      trigger: 'trigger', 
      plan: 'plan' });

    var impulseRecordReflection1 = await ImpulseRecordReflection.create({user_id: user1.id, 
      reflection_date: new Date('2024-06-01'), 
      record_impulses_immediately: true,
      use_alternatives: true,
      impulse_persistence_effects: 'a',
      impulse_persistence_improvement_areas: 'a'});

    var impulseRecordReflection2 = await ImpulseRecordReflection.create({user_id: user1.id, 
      reflection_date: new Date('2024-06-01'), 
      record_impulses_immediately: true,
      use_alternatives: true,
      impulse_persistence_effects: 'a',
      impulse_persistence_improvement_areas: 'a'
      });

    await impulseRecord1.addImpulseRecordReflection(impulseRecordReflection1);
    await impulseRecord1.addImpulseRecordReflection(impulseRecordReflection2);
    await impulseRecord2.addImpulseRecordReflection(impulseRecordReflection1);

    const ir1 = await ImpulseRecord.findOne({ where: { id: impulseRecord1.id }, include: ImpulseRecordReflection });
    expect(ir1.ImpulseRecordReflections).to.be.an('array').that.has.lengthOf(2);
    const irRelfection2 = await ImpulseRecordReflection.findOne( {where : {id: impulseRecordReflection2.id}, include: ImpulseRecord })
    expect(irRelfection2.ImpulseRecords).to.be.an('array').that.has.lengthOf(1);
    expect(irRelfection2.ImpulseRecords[0].id).to.equal(impulseRecord1.id)
  });
});

