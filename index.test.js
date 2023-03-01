const {sequelize} = require('./db');
const {Band, Musician} = require('./index')

describe('Band and Musician Models', () => {
    
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        // TODO - test creating a band
        const testBand = await Band.create({name: "Dodie", genre: "indie"})
        expect(testBand.name).toBe('Dodie');
        expect(testBand.genre).toBe('indie');
    });

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        const testMusician = await Musician.create({name: "Dorothy Miranda Clark", instrument: "Voice"})
        expect(testMusician.name).toBe("Dorothy Miranda Clark");
        expect(testMusician.instrument).toBe("Voice");
    });
})