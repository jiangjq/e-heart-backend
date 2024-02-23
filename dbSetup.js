const sqlite3 = require('sqlite3').verbose();

// 创建一个数据库文件（如果文件不存在，则会创建一个新文件）
const db = new sqlite3.Database('./cbt_e_project.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the CBT-E SQLite database.');
});

// 创建一个用户表
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
)`, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Users table created or already exists.');
});

// 关闭数据库连接
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Closed the database connection.');
});
