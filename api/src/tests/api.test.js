const assert = require('assert');
const api = require('./../index');

let app = {};

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
            url: '/heroes?pageSize=1&page=1&name=flash'
        });
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
    });
});