const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mysql = require('mysql2/promise'); // 确保导入 mysql2/promise
const db = require('./models'); // 导入 Sequelize 实例

// 路由导入
const userRoutes = require('./routes/userRoutes');
// const dietLogRoutes = require('./routes/dietLogRoutes');
// const foodPurgeLogRoutes = require('./routes/foodPurgeLogRoutes');
// const mealPlanRoutes = require('./routes/mealPlanRoutes');
// const impulseRecordRoutes = require('./routes/impulseRecordRoutes');
// const impulseStrategyRoutes = require('./routes/impulseStrategyRoutes');
// const dietLogReflectionRoutes = require('./routes/dietLogReflectionRoutes');
// const mealPlanReflectionRoutes = require('./routes/mealPlanReflectionRoutes');
// const impulseRecordReflectionRoutes = require('./routes/impulseRecordReflectionRoutes');

// 中间件
app.use(express.json());

// 路由设置
app.use('/api/users', userRoutes);
// app.use('/api/diet_logs', dietLogRoutes);
// app.use('/api/food_purge_logs', foodPurgeLogRoutes);
// app.use('/api/meal_plans', mealPlanRoutes);
// app.use('/api/impulse_records', impulseRecordRoutes);
// app.use('/api/impulse_strategies', impulseStrategyRoutes);
// app.use('/api/diet_log_reflections', dietLogReflectionRoutes);
// app.use('/api/meal_plan_reflections', mealPlanReflectionRoutes);
// app.use('/api/impulse_record_reflections', impulseRecordReflectionRoutes);

// 配置数据库连接
const sequelizeConfig = require('./config/database.js').development;

// 定义 createDatabase 函数
async function createDatabase() {
  console.log(`Connecting to MySQL with user: ${sequelizeConfig.username} and password: ${sequelizeConfig.password}`);

  // 使用 mysql2 连接到 MySQL 服务器
  const connection = await mysql.createConnection({
    host: sequelizeConfig.host,
    user: sequelizeConfig.username,
    password: 'password', // 确保传递正确的密码
  });

  // 创建数据库（如果不存在）
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${sequelizeConfig.database}\`;`);
  await connection.end();
}

// 创建数据库并启动服务器
createDatabase().then(() => {
  // 同步模型
  db.sequelize.sync({ force: false }).then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }).catch(error => {
    console.error('Unable to connect to the database:', error);
  });
}).catch(error => {
  console.error('Error creating database:', error);
});
