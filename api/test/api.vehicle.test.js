const assert = require('assert');
const app = require('./../src/index');

// our mocks
const { MOCK_VEHICLE_API_A, MOCK_VEHICLE_API_B } = require('./../__mocks__/vehicle.mock');

// our api
let api = {};

describe("vehicles rest api test suite", function() {
    this.timeout(Infinity);

    before(async () => {
        api = await app;
    });

    it("should create a vehicle", async () => {
        const { payload, statusCode } = await api.inject({
            method: 'POST',
            url: '/vehicles',
            payload: MOCK_VEHICLE_API_A
        });
        const result = JSON.parse(payload);
        if (statusCode !== 200) console.log(statusCode, result);
        assert.deepEqual(statusCode, 200);
        assert.deepEqual(result.plate, MOCK_VEHICLE_API_A.plate);
    });
});