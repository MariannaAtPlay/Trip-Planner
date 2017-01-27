var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/tripPlanne', {
    logging: false
});

module.exports = {
    db: db
};

