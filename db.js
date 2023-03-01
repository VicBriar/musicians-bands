const path = require('path');
const { Sequelize, Model, DataTypes } = require('sequelize');

// DONE - create the new sequelize connection
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "db.sqlite"
});

module.exports = {
    sequelize,
    Sequelize,
    DataTypes
};
