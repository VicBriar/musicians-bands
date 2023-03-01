const {Sequelize, sequelize, DataTypes} = require('./db');

// TODO - define the Musician model
let Musician = sequelize.Build("Musician",{
    name: DataTypes.STRING,
    insrument: DataTypes.STRING
})

module.exports = {
    Musician
};