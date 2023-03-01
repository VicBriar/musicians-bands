const {Sequelize, sequelize, DataTypes} = require('./db');

// TODO - define the Musician model
let Musician = sequelize.define("Musician",{
    name: DataTypes.TEXT,
    instrument: DataTypes.TEXT
})

module.exports = {
    Musician
};