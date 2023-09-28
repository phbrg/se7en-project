const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('se7en', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('> DB Ok')
} catch(err) {
    console.log(`> DB Error: ${err}`);
}

module.exports = sequelize;