const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mysql = require('mysql2/promise'); // Ensure mysql2/promise is imported
const db = require('./models'); // Import Sequelize instance

// Import routes
const userRoutes = require('./routes/userRoutes');
const dietLogRoutes = require('./routes/dietLogRoutes');
const foodPurgeLogRoutes = require('./routes/foodPurgeLogRoutes');
const dietLogReflectionRoutes = require('./routes/dietLogReflectionRoutes');

// Middleware
app.use(express.json());

// Setup routes
console.log('1111111111');
app.use('/api/users', userRoutes);
console.log('2222');
app.use('/api/diet_logs', dietLogRoutes);
app.use('/api/food_purge_logs', foodPurgeLogRoutes);
app.use('/api/diet_log_reflections', dietLogReflectionRoutes);
console.log('33333');

// Database connection configuration
const sequelizeConfig = require('./config/database.js').development;

// Define createDatabase function
async function createDatabase() {
  console.log(`Connecting to MySQL with user: ${sequelizeConfig.username} and password: ${sequelizeConfig.password}`);

  // Use mysql2 to connect to MySQL server
  const connection = await mysql.createConnection({
    host: sequelizeConfig.host,
    user: sequelizeConfig.username,
    password: sequelizeConfig.password, // Ensure correct password
  });

  // Create database if it doesn't exist
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${sequelizeConfig.database}\`;`);
  await connection.end();
}

// Create database and start server
createDatabase().then(() => {
  // Sync models
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
module.exports = app; // 确保导出 app 对象