const ContextStrategy = require('./db/strategies/base/contextStrategy');
const MongoDB = require('./db/strategies/mongodb');
const PSQL = require('./db/strategies/postgres');

const contextMongo = new ContextStrategy(new MongoDB());
contextMongo.create();

const contextPSQL = new ContextStrategy(new PSQL());
contextPSQL.create();

// this line below will throw our not implemented error 
// contextMongo.read();