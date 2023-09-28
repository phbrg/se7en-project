const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'arkadia',
  username: 'postgres',
  password: '1234'
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('> DB Ok');
  } catch (err) {
    console.log(`> DB Error: ${err}`);
  }
})();

module.exports = sequelize;