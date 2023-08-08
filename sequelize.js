const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'hostname_or_ip', // Use the correct hostname or IP address here
  dialect: 'mysql',
  port: 3306,
});

module.exports = sequelize;
