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
        //assigning foreign id's
        const florence = await Musician.create({name: "Florence Welch", instrument: "voice"})
        const dave = await Musician.create({name: "Dave Bayley", instrument: "voice"})
        const glassAnimals = await Band.create({name: "Glass Animals", genre: "pop-rock"})
        const florenceandtheMachine = await Band.create({name: "Florence + The Machine", genre: "inide-rock"})
        florenceandtheMachine.addMusician(florence);
        glassAnimals.addMusician(dave);
        testBand.addMusician(testMusician);
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
        const testBand1 = await Band.findByPk(4);
        //assigning Musician to band
        testBand1.addMusician(testMusician1);
        await testMusician1.save();
        expect(testMusician1.name).toBe("Rob Bourdon");
        expect(testMusician1.instrument).toBe("Drums");
    });

    test('Can update a Song', async () => {
        const inTheEnd = await Song.create({title: "In The End", year: 1996})
        const HeavenIsHere = await Song.create({title: "Heaven is Here", year: 2022})
        florenceandtheMachine = await Band.findOne({where: {name: "Florence + The Machine"}})
        await florenceandtheMachine.createSong({title: "King", year: 2022})
        inTheEnd.year = 2001;
        expect(inTheEnd.year).toBe(2001);
        await inTheEnd.addBand(4);
        await HeavenIsHere.addBand(2);
        await HeavenIsHere.addBand(3);
        const LinkinPark = await Band.findByPk(4);
        expect(await LinkinPark.countSongs()).toBe(1)
        const linkinParkSongs = await LinkinPark.getSongs()
        expect(linkinParkSongs[0].title).toBe("In The End")
        await inTheEnd.save()


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
    test('can destroy a song', async () => {
        let linkinPark = await Band.findAll({
                where: {
                    name: "Linkin Park"
                }
        })
        let inTheEnd = await Song.findAll({
                where: {
                    title: "In The End"
                }
        })
        //find returns and array of objects, so I need the first, (and only) object
        inTheEnd = inTheEnd[0]
        //i need the id so I don't have to use find all again
        inTheEndid = inTheEnd.id
        //destroys the instance in the DATATBASE but not in the JS
        await inTheEnd.destroy()
        //updating intheend to reflect the database's items
        inTheEnd = await Song.findByPk(inTheEndid)
        expect(inTheEnd).toBe(null)
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
        const testBand1 = await Band.findByPk(4);
        const testMusician3 = await testBand1.createMusician({name: "Mike Shinoda", instrument: "Piano"})
        await testMusician3.save();
        await testBand1.save();
        expect(testMusician3.BandId).toBe(4)
        expect(await testBand1.countMusicians()).toBe(2);
        expect(await testBand1.hasMusician(testMusician3)).toBe(true);
    })

    test('Song belongs to many bands, bands belong to many songs', async () => {
        florenceandtheMachine = await Band.findOne({
                where: {
                    name: "Florence + The Machine"
                }
        })
        glassAnimals = await Band.findOne({
            where: {
                name: "Glass Animals"
            }
        })
        expect(await florenceandtheMachine.countSongs()).toBe(2)
        expect(await glassAnimals.countSongs()).toBe(1)
    })
    test('using eager loadng', async () =>{
        const dodie = await Band.findOne(
            {include: [{model: Musician}]},
            {where: {name: "dodie"}}
        )
        expect(typeof dodie).toBe("object")
        expect(dodie.Musicians.length).toBe(1)

    })

})