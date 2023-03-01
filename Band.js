const {Sequelize, sequelize, DataTypes} = require('./db');

// TODO - define the Band model
let Band = sequelize.define("Band",{
    name: DataTypes.TEXT,
    genre: DataTypes.TEXT,
    showCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
})

module.exports = {
    Band
};