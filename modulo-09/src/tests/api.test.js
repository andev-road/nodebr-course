const assert = require('assert');
const api = require('./../index');

let app = {};

// hero mock to insert
const MOCK_HERO_INSERT = {
    name: 'developer',
    power: 'craft code from coffee'
};

// hero mock to update completely
const MOCK_HERO_UPDATE = {
    name: 'god',
    power: 'craft life from coffee'
};

// hero mock to just patch
const MOCK_HERO_UPDATE_NAME = { name: 'ex-god' };

describe('API tests suite', function () {
    this.timeout(Infinity);

    before(async () => {
        app = await api;
    });

    it('should return status 200 at GET /heroes', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/heroes'
        });
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
    });

    it('should return status 200 at GET /heroes with querystring', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/heroes?pageSize=2&page=1&name=flash'
        });
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
    });

    it('should return status 200 at POST /heroes', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/heroes',
            payload: MOCK_HERO_INSERT
        });
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
    });

    it('should return status 200 at PUT /heroes/{id}', async () => {
        // get the one we inserted before
        const { payload } = await app.inject({
            method: 'GET',
            url: `/heroes?name=${MOCK_HERO_INSERT.name}`
        });
        const [ { id } ] = JSON.parse(payload);

        // updating object
        const result = await app.inject({
            method: 'PUT',
            url: `/heroes/${id}`,
            payload: MOCK_HERO_UPDATE
        });
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
    });

    it('should return status 200 at PATCH /heroes/{id}', async () => {
        // get the one we inserted before
        const { payload } = await app.inject({
            method: 'GET',
            url: `/heroes?name=${MOCK_HERO_UPDATE.name}`
        });
        const [ { id } ] = JSON.parse(payload);

        // updating object
        const result = await app.inject({
            method: 'PATCH',
            url: `/heroes/${id}`,
            payload: MOCK_HERO_UPDATE_NAME
        });
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
    });

    it('should return status 200 at DELETE /heroes/{id}', async () => {
        // get the one we inserted before
        const { payload } = await app.inject({
            method: 'GET',
            url: `/heroes?name=${MOCK_HERO_UPDATE_NAME.name}`
        });
        const [ { id } ] = JSON.parse(payload);

        // removing object
        const result = await app.inject({
            method: 'DELETE',
            url: `/heroes/${id}`
        });
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
    });
});