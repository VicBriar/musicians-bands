![logo](https://user-images.githubusercontent.com/44912347/202296600-c5f247d6-9616-49db-88f0-38433429d781.jpg)

# Musicians and Bands Database
Rock on, dude! We're going to build Band/Musician organizer.

We’ll have 2 database models:
- Musicians
- Bands

We will be working on this across multiple days. **You should complete part 1 on day 1 and parts 2, 3, and 4 on day 2.**

## Part 1: Database Creation

### Installing Dependencies and Running Tests
1. Once the forked repository has been cloned, make sure to run `npm install`. This will install all dependencies. 
2. Additionally, you’ll need to create the following file in the root of the project: `db.sqlite`. This database file is considered sensitive in nature, so it will not be pushed up to a repository when the project is pushed.
3. To run the tests, run `npm test`. The test file is created, but each test is currently empty. Initially, you’ll get many errors and messages like `Test suite failed to run since there are missing parts`. Let’s get to that!

### TODOs: Database Creation and Tests
- Code in all the spots where it says TODO in the project (you can [search across files](https://code.visualstudio.com/docs/editor/codebasics#_search-across-files) to find the spots to edit!). Below are the instructions:
  X Create the new sequelize connection
  X Define the Band model
  X Define the Musician model
  - Test creating a band
  - Test creating a musician
- **TIP**: When testing your code you will need to first create a band or musician and then verify that it has been added. For example, a test with a User database, may look something like:
```javascript
test('can create a Band', async () => {
    const testUser = await User.create({ name: 'George', password: '123' });
    expect(testUser.name).toBe('George');
}
```
### Connection
- In `db.js`, The connection will have to be instantiated using `new Sequelize()`

### Models
- Define the models! Here are the details:
  - The `Musician` model should have name and instrument properties, both of which are strings.
  - The `Band` model should have name and genre properties, both of which are strings.

### Tests
- At this point, we can start writing the tests!  Fill out each of the tests in the suite, following the instructions provided.

### Commit & Push
- `git add .`, `git commit -a “somemessage”`, and `git push` so we can see your work!

## Part 2: One-to-Many Associations
- In the `./index.js` file, before the `module.exports`, associate the two models. **Multiple musicians can be added to a Band.**
- Add a test to account for the association
- Run `npm test`. Write a test to add multiple musicians to a band. In the test:
  - `Band.findAll()` to get the bands (if there aren’t any from the previous tests, you’ll have to `Band.create()` some!)
  - For each of the bands, use something like `foundBand.getMusicians()` to check that they have been added correctly!
- `git add .`, `git commit -a “somemessage”`, and `git push` so we can see your work!

## Part 3: Many-to-Many Associations

### Songs Model
- Add a new file `Song.js` and in it define a new model. It should have properties `title` (string) and `year` (number).

### Associations
- In the `./index.js` file, before the `module.exports`, associate the two models.
  - Multiple songs can be added to a Band
  - Multiple bands can have the same Song
- Add another test to account for the association

### Tests
- Run `npm test`
- Write a test to add multiple musicians to a band. In the test:
  - `Band.create()` to make some bands. Use the data you’ve added in previous tests you’ve created!
  - Create at least 2 songs
  - For one band, add both songs
  - For each of the songs, use something like `foundBand.getSongs()` to check that they have been added correctly!
  - Do the same with the bands

### Commit & Push
- `git add .`, `git commit -a “somemessage”`, and `git push` so we can see your work!

## Part 4: Eager Loading
- Run `npm test`
- Create test data and associate the models as in previous tests.
- Find all the Bands
- In the `Band.findAll()` call, include the `Musician` model.
- Do the same again, but this time include the `Song` model.
- Test the output
- `git add .`, `git commit -a “somemessage”`, and `git push` so we can see your work!
