const {sequelize} = require('./db');
const {Band, Musician, Song} = require('./index')
//Florence + The Machine, indie-rock
//Glass Animals, pop-rock
//Florence Welch, vocalist
//Dave Bayley, vocalist
//Heaven is Here 2022
//King 2022

describe('Band and Musician Models', () => {
    
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        // test creating a band
        const testBand = await Band.create({name: "Dodie", genre: "indie"})
        expect(testBand.name).toBe('Dodie');
        expect(testBand.genre).toBe('indie');
        expect(testBand.showCount).toBe(0)
    });

    test('can create a Musician', async () => {
        // test creating a musician
        const testMusician = await Musician.create({name: "Dorothy Miranda Clark", instrument: "Voice"})
        const testBand = await Band.findByPk(1)
        testBand.addMusician(testMusician);
        expect(testMusician.name).toBe("Dorothy Miranda Clark");
        expect(testMusician.instrument).toBe("Voice");
        const florence //i am here
    });

    test('can create a Song', async () => {
        const testSong = await Song.create({title: "She", year: 2019})
        expect(testSong.title).toBe("She")
        expect(testSong.year).toBe(2019)
        expect(await testSong.countBands()).toBe(0)
    })
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
        //finding band that has musician
        const testBand1 = await Band.findByPk(2);
        //assigning Musician to band
        testBand1.addMusician(testMusician1);
        await testMusician1.save();
        expect(testMusician1.name).toBe("Rob Bourdon");
        expect(testMusician1.instrument).toBe("Drums");
    });

    test('Can update a Song', async () => {
        const inTheEnd = await Song.create({title: "In The End", year: 1996})
        const HeavenIsHere = await Song.create({title: "Heaven is Here", year: 2022})
        const King = await Song.create({title: "King", year: 2022})
        const inTheEndId = inTheEnd.id;
        inTheEnd.year = 2001;
        expect(inTheEnd.year).toBe(2001);
        await inTheEnd.addBand(2);
        const LinkinPark = await Band.findByPk(2);
        expect(await LinkinPark.countSongs()).toBe(1)
        const linkinParkSongs = await LinkinPark.getSongs()
        expect(linkinParkSongs[0].title).toBe("In The End")

    })
    test('can destroy Band', async () => {
        const testBand2 = await Band.create({name: "lankinPirk", genre: "roock"})
        const id = testBand2.id;
        await testBand2.destroy();
        const band2 = await Band.findByPk(id);

        expect(band2).toBe(null);

    })
    test('can destroy Musician',async () => {
        let testMusician2 = await Musician.create({name: "Rab Bourdon", instrument: "Drumies"})
        const id = testMusician2.id;
        await testMusician2.destroy()
        testMusician2 = await Musician.findByPk(id)

        expect(testMusician2).toBe(null);

    })

    test('Musician belongs to Band',async () => {
        const testMusician = await Musician.findByPk(1)
        const testBand = await Band.findByPk(1)
        const hasMuscians = await testBand.countMusicians();
        expect(testMusician.BandId).toBe(1)
        expect(hasMuscians).toBe(1)
        expect(await testBand.hasMusician(testMusician)).toBe(true)
    })

    test('Band has many Musicians',async () => {
        const testBand1 = await Band.findByPk(2);
        const testMusician3 = await testBand1.createMusician({name: "Mike Shinoda", instrument: "Piano"})
        await testMusician3.save();
        await testBand1.save();
        expect(testMusician3.BandId).toBe(2)
        expect(await testBand1.countMusicians()).toBe(2);
        expect(await testBand1.hasMusician(testMusician3)).toBe(true);
    })

})