const assert = require('assert');

// our database
const MariaDB = require('./../src/db/mariadb');
const vehicleSchema = require('./../src/db/schemas/vehicle.schema');
let vehicleContext = null;

// our mocks
const { MOCK_VEHICLE_A, MOCK_VEHICLE_B } = require('./../__mocks__/vehicle.mock');

describe("vehicles database connection test suite", function() {
    this.timeout(10000);

    before(async () => {
        const conn = await MariaDB.connect();
        const vehicleModel = await MariaDB.defineSchema(conn, vehicleSchema);
        vehicleContext = new MariaDB(conn, vehicleModel);
    });

    it("should connect to mariadb", async () => {
        assert.ok(await vehicleContext.isConnected());
    });

    it("should insert a new vehicle", async () => {
        const result = await vehicleContext.create(MOCK_VEHICLE_A);
        assert.deepEqual(MOCK_VEHICLE_A.plate, result.plate);
    });

    it("should get a vehicle", async () => {
        const [result] = await vehicleContext.get({ plate: MOCK_VEHICLE_A.plate });
        assert.deepEqual(MOCK_VEHICLE_A.plate, result.plate);
    });

    it("should update a vehicle", async () => {
        const updateQuery = { plate: MOCK_VEHICLE_B.plate };
        const [result] = await vehicleContext.update(updateQuery, { plate: MOCK_VEHICLE_A.plate });
        assert.deepEqual(1, result);
    });

    it("should generate paginated report of vehicles", async () => {
        const result = await vehicleContext.report();
        console.log("report: ", result);
        assert.ok(result.length > 0);
    });
    
    it("should delete a vehicle", async () => {
        const result = await vehicleContext.delete({ plate: MOCK_VEHICLE_B.plate });
        assert.deepEqual(1, result);
    });
});