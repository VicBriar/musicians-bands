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
        expect(testBand.showCount).toBe(0)
    });

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        const testMusician = await Musician.create({name: "Dorothy Miranda Clark", instrument: "Voice"})
        expect(testMusician.name).toBe("Dorothy Miranda Clark");
        expect(testMusician.instrument).toBe("Voice");
    });

    test('can update Band', async () => {
        const testBand1 = await Band.create({name: "lankinPirk", genre: "roock", showCount: 100})
        testBand1.set({
            name: "Linkin Park",
            genre: "rock",
            })
            testBand1.showCount++

        await testBand1.save();    
        expect(testBand1.name).toBe("Linkin Park");
        expect(testBand1.genre).toBe("rock");
        expect(testBand1.showCount).toBe(101);
    })
    test('can update Musician', async () => {
        const testMusician1 = await Musician.create({name: "Rab Bourdon", instrument: "Drumies"})
        testMusician1.set({
            name: "Rob Bourdon",
            instrument: "Drums",
        });
        await testMusician1.save();
        expect(testMusician1.name).toBe("Rob Bourdon");
        expect(testMusician1.instrument).toBe("Drums");
    });
    test('can Destroy Band', async () => {
        const testBand2 = await Band.create({name: "lankinPirk", genre: "roock", showCount: 100})
        const id = testBand2.id;
        await testBand2.destroy();
        const band2 = await Band.findByPk(id);

        expect(band2).toBe(null);

    })
    test('can destory Musician',async () => {
        const testMusician2 = await Musician.create({name: "Rab Bourdon", instrument: "Drumies"})
        const id = testMusician2.id;
        await testMusician2.destroy()
        const musician2 = await Musician.findByPk(id)

        expect(musician2).toBe(null);

    })

        
})