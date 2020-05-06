const hapi = require('hapi');

// database strategies
const Context = require('./../db/strategies/base/contextStrategy');
const PSQL = require('./../db/strategies/postgres/postgres');
const HeroSchema = require('./../db/strategies/postgres/schemas/heroes.schema')

// our api properties
const app = new hapi.Server({
    port: 8083
});

async function main() {

    // starting our db 
    const psqlConnection = await PSQL.connect();
    const heroModel = await PSQL._defineModel(psqlConnection, HeroSchema);
    const context = new Context(new PSQL(psqlConnection, heroModel));

    // creating our routes
    app.route([
        {
            path: '/heroes',
            method: 'GET',
            handler: (request, head) => {
                return context.read();
            }
        }
    ])

    // starting our api
    await app.start();
    console.log("api already running in ", app.info.port);
}

main();