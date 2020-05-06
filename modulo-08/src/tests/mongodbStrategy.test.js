const assert = require('assert');
const MongoDB = require('./../db/strategies/mongodb/mongodb');
const Context = require('./../db/strategies/base/contextStrategy');
const heroSchema = require('./../db/strategies/mongodb/schemas/heroes.schema');

// const context = new Context(new MongoDB());
let context = {};

// creating our mock to insert, select and remove
const MOCK_HERO_CREATE = {
    name: 'superman',
    power: 'wear underwear'
};

// creating our mock to update, select and remove
const MOCK_HERO_UPDATE = {
    name: 'ex-superman',
    power: 'ex-wear underwear'
};

describe("Testing MongoDB strategy", async function () {
    this.timeout(Infinity);

    before(async () => {
        const connection = await MongoDB.connect();
        context = new Context(new MongoDB(connection, heroSchema));
    });

    it("should connect to mongodb", async () => {
        const result = context.isConnected();
        const expected = true;
        assert.deepEqual(result, expected);
    });

    it('should insert a hero to mongodb', async () => {
        const { name } = await context.create(MOCK_HERO_CREATE);
        assert.deepEqual(name, MOCK_HERO_CREATE.name);
    });

    it('should list first hero filtered by name from mongodb', async () => {
        const [expected] = await context.read({ name: MOCK_HERO_CREATE.name });
        const { name } = expected;
        assert.deepEqual(name, MOCK_HERO_CREATE.name);
    });

    it('should list all heroes from mongodb', async () => {
        const result = await context.read(null, 1, 0);
        assert.ok((result.length >= 0));
    });

    it('should read heroes with pagination from mongodb', async () => {
        const result = await context.read();
        assert.ok((result.length > 0));
    });

    it('should update one hero from mongodb', async () => {
        const [initialStateHero] = await context.read({ name: MOCK_HERO_CREATE.name });
        const resultUpdateObj = await context.update(initialStateHero._id, MOCK_HERO_UPDATE);
        const result = resultUpdateObj.nModified >= 1;
        assert.deepEqual(true, result);
    });

    it('should get one hero by id from mongodb', async () => {
        const [expected] = await context.read({ name: MOCK_HERO_UPDATE.name });
        const result = await context.get(expected._id);
        assert.deepEqual(result, expected);
    });

    it('should delete one hero by id from mongodb', async () => {
        const [item] = await context.read({ name: MOCK_HERO_UPDATE.name });
        const resultDeleteObj = await context.delete(item._id);
        const result = resultDeleteObj.deletedCount >= 1;
        assert.deepEqual(true, result);
    });

});