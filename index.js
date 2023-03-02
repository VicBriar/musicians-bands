const {Band} = require('./Models/Band')
const {Musician} = require('./Models/Musician')
const {Song} = require('./Models/Song')


Song.belongsToMany(Band, {through: "Song_Band"})
Band.belongsToMany(Song, {through: "Song_Band"})
Musician.belongsTo(Band);
Band.hasMany(Musician);

module.exports = {
    Band,
    Musician,
    Song
};
