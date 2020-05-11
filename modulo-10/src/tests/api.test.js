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

// jwt mock
const JWT_MOCK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIxMjMiLCJpZCI6MSwiaWF0IjoxNTg5MTU4MDE4fQ.rmGM-9btaLgJQgMHdlxDnd2xcQ0zP4lW7UBXtr0uX-0";

// request headers mock
const headers = {
    Authorization: JWT_MOCK
};

describe('API tests suite', function () {
    this.timeout(Infinity);

    before(async () => {
        app = await api;
    });

    it('should return status 200 at GET /heroes', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/heroes',
            headers
        });
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
    });

    it('should return status 200 at GET /heroes with querystring', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/heroes?pageSize=2&page=1&name=flash',
            headers
        });
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
    });

    it('should return status 200 at POST /heroes', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/heroes',
            headers,
            payload: MOCK_HERO_INSERT
        });
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
    });

    it('should return status 200 at PUT /heroes/{id}', async () => {
        // get the one we inserted before
        const { payload } = await app.inject({
            method: 'GET',
            url: `/heroes?name=${MOCK_HERO_INSERT.name}`,
            headers
        });
        const [ { id } ] = JSON.parse(payload);

        // updating object
        const result = await app.inject({
            method: 'PUT',
            url: `/heroes/${id}`,
            payload: MOCK_HERO_UPDATE,
            headers
        });
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
    });

    it('should return status 200 at PATCH /heroes/{id}', async () => {
        // get the one we inserted before
        const { payload } = await app.inject({
            method: 'GET',
            url: `/heroes?name=${MOCK_HERO_UPDATE.name}`,
            headers
        });
        const [ { id } ] = JSON.parse(payload);

        // updating object
        const result = await app.inject({
            method: 'PATCH',
            url: `/heroes/${id}`,
            payload: MOCK_HERO_UPDATE_NAME,
            headers
        });
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
    });

    it('should return status 200 at DELETE /heroes/{id}', async () => {
        // get the one we inserted before
        const { payload } = await app.inject({
            method: 'GET',
            url: `/heroes?name=${MOCK_HERO_UPDATE_NAME.name}`,
            headers
        });
        const [ { id } ] = JSON.parse(payload);

        // removing object
        const result = await app.inject({
            method: 'DELETE',
            headers,
            url: `/heroes/${id}`
        });
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
    });
});