var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/tripPlanne', {
    logging: false
});

var Place = db.define('place', {
    address: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    phone: Sequelize.STRING,
    location: Sequelize.ARRAY(Sequelize.FLOAT)
}),

var Hotel = db.define('hotel', {
    name: Sequelize.STRING,
    num_stars: {
        type: Sequelize.INTEGER,
        validate:{
            min: 1,
            max: 5
        } 
    },
    amenities: Sequelize.STRING
}),

var Activity = db.define('activity', {
    name: Sequelize.STRING,
    age_range: 
})
module.exports = {
    db: db
};

