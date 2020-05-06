const hapi = require('hapi');

// imports - database strategies - postgres
const Context = require('./db/strategies/base/contextStrategy');
const PSQL = require('./db/strategies/postgres/postgres');
const HeroSchema = require('./db/strategies/postgres/schemas/heroes.schema')

// our api config properties
const app = new hapi.Server({
    port: 8083
});

// our hero routes
const HeroRoute = require('./routes/hero.route');

// will map every function name returning the function itself (using the instance)
function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]());
}

// api core
async function main() {

    // starting our context of psql db 
    const psqlConnection = await PSQL.connect();
    const psqlHeroModel = await PSQL._defineModel(psqlConnection, HeroSchema);
    const psqlContext = new Context(new PSQL(psqlConnection, psqlHeroModel));

    // creating our routes
    app.route([
        ...mapRoutes(new HeroRoute(psqlContext), HeroRoute.methods())
    ]);

    // starting our api
    await app.start();
    console.log("api already running in ", app.info.port);

    return app;
}

module.exports = main();