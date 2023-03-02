const {Sequelize, sequelize, DataTypes} = require('../db');

// TODO - define the Band model
let Band = sequelize.define("Band",{
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
    showCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
})

module.exports = {
    Band
};