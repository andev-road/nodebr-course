const hapi = require('hapi');

// our database
const MariaDB = require('./db/mariadb');
const VehicleSchema = require('./db/schemas/vehicle.schema');

// our hapi server config
const app = new hapi.Server({
    port: 8084
});

// our api routes
const VehicleRoute = require('./routes/vehicle.route');

// function to help getting all methods from our routes
function mappingRoutes(instance, methods) {
    return methods.map(method => instance[method]());
}

// core api function
async function main() {

    // starting the connection with our database
    const conn = await MariaDB.connect();
    const vehicleModel = await MariaDB.defineSchema(conn, VehicleSchema);
    const vehicleContext = new MariaDB(conn, vehicleModel);

    // creating our routes in our api
    app.route(mappingRoutes(new VehicleRoute(vehicleContext), VehicleRoute.methods()));

    // starting our api
    await app.start();
    console.log("api running on port ", app.info.port);

    return app;
}

module.exports = main();