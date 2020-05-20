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

    it("should read all vehicles", async () => {
        const { payload, statusCode } = await api.inject({
            method: 'GET',
            url: '/vehicles'
        });
        const result = JSON.parse(payload);
        if (statusCode !== 200) console.log(statusCode, result);
        assert.deepEqual(statusCode, 200);
    });

    it("should get report of vehicles", async () => {
        const { payload, statusCode } = await api.inject({
            method: 'GET',
            url: '/vehicles?page=1&itemsPerPage=2'
        });
        const result = JSON.parse(payload);
        if (statusCode !== 200) console.log(statusCode, result);
        assert.deepEqual(statusCode, 200);
    });

    it("should get one vehicle", async () => {
        // our example
        const { payload } = await api.inject({
            method: 'GET',
            url: '/vehicles'
        });
        const [result] = JSON.parse(payload);
        
        if (result) { // if we have 1 example at least
            const { payload, statusCode } = await api.inject({
                method: 'GET',
                url: `/vehicles/${result.id}`
            });
            const [resultGet] = JSON.parse(payload);
            if (statusCode !== 200) console.log(statusCode, resultGet);
            assert.deepEqual(statusCode, 200);
            assert.deepEqual(resultGet.plate, result.plate);
        } else {
            throw new Error("there nothing in database to test");
        }
    });
    
    it("should update one vehicle", async () => {
        // our example
        const { payload } = await api.inject({
            method: 'GET',
            url: `/vehicles?plate=${MOCK_VEHICLE_API_A.plate}`
        });
        const [result] = JSON.parse(payload);
        
        if (result) { // if we have 1 example at least
            const { payload, statusCode } = await api.inject({
                method: 'PATCH',
                url: `/vehicles/${result.id}`,
                payload: {
                    plate: MOCK_VEHICLE_API_B.plate
                }
            });
            const [resultPatch] = JSON.parse(payload);
            if (statusCode !== 200) console.log(statusCode, resultPatch);
            assert.deepEqual(statusCode, 200);
            assert.ok(resultPatch >= 1);
        } else {
            throw new Error("there nothing in database to test");
        }
    });

    it("should remove one vehicle", async () => {
        // our example
        const { payload } = await api.inject({
            method: 'GET',
            url: `/vehicles?plate=${MOCK_VEHICLE_API_B.plate}`
        });
        const [result] = JSON.parse(payload);

        if (result) { // if we have 1 example at least
            const { payload, statusCode } = await api.inject({
                method: 'DELETE',
                url: `/vehicles/${result.id}`
            });
            const resultRemove = JSON.parse(payload);
            if (statusCode !== 200) console.log(statusCode, resultPatch);
            assert.deepEqual(statusCode, 200);
            assert.ok(resultRemove >= 1);
        } else {
            throw new Error("there nothing in database to test");
        }
    });

});