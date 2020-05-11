const hapi = require('hapi');

// swagger
const HapiSwagger = require('hapi-swagger');
const Vision = require('vision');
const Inert = require('inert');

// imports - database strategies - postgres
const Context = require('./db/strategies/base/contextStrategy');
const PSQL = require('./db/strategies/postgres/postgres');
const HeroSchema = require('./db/strategies/postgres/schemas/heroes.schema');
const UserSchema = require('./db/strategies/postgres/schemas/users.schema');

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

    // starting psql connection
    const psqlConnection = await PSQL.connect();

    // starting our context of table heroes in psql db 
    const psqlHeroModel = await PSQL._defineModel(psqlConnection, HeroSchema);
    const psqlContext = new Context(new PSQL(psqlConnection, psqlHeroModel));

    // starting out context of table users in psql db
    const psqlUsersModel = await PSQL._defineModel(psqlConnection, UserSchema);
    const userContext = new Context(new PSQL(psqlConnection, psqlUsersModel));

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
        validate: async (payload, request) => {
            // console.log("payload: ", payload);
            // get the payload of the jwt and do whatever you need
            //      (eg. look if id still active in database, etc...)
            const [user] = await userContext.read({
                username: payload.username,
                password: payload.password
            });
            if (!user)
                return { isValid: false };
            
            
            return {
                isValid: true
            }
        }
    });
    app.auth.default('jwt'); // setting our authentication

    // creating our routes
    app.route([
        ...mapRoutes(new HeroRoute(psqlContext), HeroRoute.methods()),
        ...mapRoutes(new AuthRoute(JWT_SECRET, userContext), AuthRoute.methods())
    ]);

    // starting our api
    await app.start();
    console.log("api already running in ", app.info.port);

    return app;
}

module.exports = main();