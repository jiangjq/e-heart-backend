// 导入Express库
const express = require('express');

// 创建Express应用
const app = express();
app.use(express.json()); 

// 添加跨域请求中间件
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


// 定义端口号
const port = 3000;

const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const db = new sqlite3.Database('./cbt_e_project.db');


// 定义根路由的处理器
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 使应用监听指定端口，等待连接
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// 注册API
app.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {

      return res.status(400).send('Username, password, and email are required');
    }
  
    // 检查用户名是否已存在
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
      if (err) {
        return res.status(500).send('Error checking for existing user');
      }
      if (row) {
        return res.status(409).send('Username already exists');
      }
  
      // 哈希密码
      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
          return res.status(500).send('Error hashing password');
        }
  
        // 存储新用户
        const insert = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
        db.run(insert, [username, hashedPassword, email], (err) => {
          if (err) {
            return res.status(500).send('Error registering new user');
          }
          res.status(200).send('User registered successfully');
        });
      });
    });
  });
  


// 登录API
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // 使用用户名查找用户
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Error on the server' });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 验证密码
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ error: 'Password is not valid' });
    }
    console.log('user:' + JSON.stringify(user));

    // 登录成功，返回用户信息
    const userData = {
      userId: user.id, // 假设您的用户表中有userId字段
      username: user.username,
      email: user.email
    };
    console.log('userData:' + JSON.stringify(userData));
    res.status(200).json(userData);
  });
});
