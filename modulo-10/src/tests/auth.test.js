const assert = require('assert');
const api = require('../index');
let app = {};

describe('auth tests suite', function () {

    before(async () => {
        app = await api;
    });

    it('should obtain jwt', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'admin',
                password: '123'
            }
        });

        const { statusCode } = result;
        assert.deepEqual(statusCode, 200);
    });

});