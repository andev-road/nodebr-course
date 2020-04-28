const { deepEqual } = require('assert');
const database = require('./database');

const DEFAULT_ITEM_MOCK = {
    name: 'iron man',
    power: 'be iron man',
    id: 1
};

const DEFAULT_ITEM_UPDATE = {
    name: 'spiderman',
    power: 'spidey things',
    id: 3
};

describe('hero manipulation suite', () => {

    before(async () => {
        await database.insert(DEFAULT_ITEM_MOCK);
        await database.insert(DEFAULT_ITEM_UPDATE);
    });

    it('should find a hero', async () => {
        const expected = DEFAULT_ITEM_MOCK;
        // putting the [ ] makes js get just the 1st  position of array
        // if we put another var name beside, itll get the 2nd position
        const [ result ] = await database.get(expected.id);
        deepEqual(result, expected);
    });

    it('should insert a hero', async () => {
        const expected = {
            ...DEFAULT_ITEM_MOCK,
            id: 2
        };
        const insertResult = await database.insert(expected);
        if (insertResult) {
            const [ databaseInsertedHero ] = await database.get(expected.id);
            deepEqual(expected, databaseInsertedHero);
        } else {
            throw new Error('couldnt insert to database');
        }
    });

    it('should delete a hero by id', async () => {
        const expected = true;
        const resultado = await database.remove(DEFAULT_ITEM_MOCK.id);
        deepEqual(resultado, expected);
    });

    it('should update a hero by id', async () => {
        // now we can update it
        const expected = {
            ...DEFAULT_ITEM_UPDATE,
            name: 'dust',
            power: 'vanish'
        };
        const result = await database.update(expected, DEFAULT_ITEM_UPDATE.id);
        if (!result)
            throw Error('couldnt update database');
        const [ databaseUpdatedHero ] = await database.get(DEFAULT_ITEM_UPDATE.id);
        deepEqual(databaseUpdatedHero, expected);
    });

});