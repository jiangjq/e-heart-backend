module.exports = {
    development: {
      username: 'root',
      password: 'password', // 替换为你的 MySQL 密码
      database: 'cbt_e_project',
      host: '127.0.0.1',
      dialect: 'mysql',
    },
    test: {
      username: 'root',
      password: 'password', // 替换为你的 MySQL 密码
      database: 'database_test',
      host: '127.0.0.1',
      dialect: 'mysql',
    },
    production: {
      username: 'root',
      password: 'password', // 替换为你的 MySQL 密码
      database: 'database_production',
      host: '127.0.0.1',
      dialect: 'mysql',
    },
  };
  