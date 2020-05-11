const hapi = require('hapi');

// swagger
const HapiSwagger = require('hapi-swagger');
const Vision = require('vision');
const Inert = require('inert');

// imports - database strategies - postgres
const Context = require('./db/strategies/base/contextStrategy');
const PSQL = require('./db/strategies/postgres/postgres');
const HeroSchema = require('./db/strategies/postgres/schemas/heroes.schema');

// imports - jwt
const HapiJwt = require('hapi-auth-jwt2');

// our JWT secret
const JWT_SECRET = "secret123";

// our api config properties
const app = new hapi.Server({
    port: 8083
});

// our routes
const HeroRoute = require('./routes/hero.route');
const AuthRoute = require('./routes/auth.route');

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

    // initializing swagger
    const swaggerOptions = {
        info: {
            title: 'RESTful API #NodeBR',
            version: 'v1.0'
        },
        lang: 'en'
    };
    await app.register([
        HapiJwt,
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    // creating our strategy of authentication
    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        /*options: {
            expiresIn: 20 // seconds
        },*/
        validate: (payload, request) => {
            // get the payload of the jwt and do whatever you need
            //      (eg. look if id still active in database, etc...)
            
            return {
                isValid: true
            }
        }
    });
    app.auth.default('jwt'); // setting our authentication

    // creating our routes
    app.route([
        ...mapRoutes(new HeroRoute(psqlContext), HeroRoute.methods()),
        ...mapRoutes(new AuthRoute(JWT_SECRET), AuthRoute.methods())
    ]);

    // starting our api
    await app.start();
    console.log("api already running in ", app.info.port);

    return app;
}

module.exports = main();