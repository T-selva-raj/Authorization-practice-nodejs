var fs = require('fs');
var path = require('path');
const Sequelize = require('sequelize');
var basename = path.basename(__filename);

const db = {};
const sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password, {
  dialect: 'mysql',
  host:  CONFIG.db_host,
  port: CONFIG.db_port,
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

  Object.keys(db).forEach(modelName => {
    if(db[modelName].associate){
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
db.Sequelize = Sequelize;
console.log(db);
module.exports = db;