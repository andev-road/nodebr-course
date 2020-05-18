// sequelize is our orm to communicate with mariadb
const Sequelize = require('sequelize');

// connection info
const host = "localhost";
const user = "root";
const pass = "123456";
const dbName = "tracker";
const config = {
    host: host,
    dialect: 'mariadb',
    dialectOptions: {connectTimeout: 10000}, 
    quoteIdentifiers: false,
    logging: false
};

class MariaDB {
    constructor(connection, schema) {
        this._connection = connection;
        this._schema = schema;
    }

    async isConnected() {
        try {
            await this._connection.authenticate();
            return true;
        } catch (err) {
            console.log("failed to connect to mariadb: ", err);
            return false;
        }
    }

    static async connect() {
        return new Sequelize(dbName, user, pass, config);
    }

    static async defineSchema(connection, schema) {
        const model = connection.define(
            schema.name, 
            schema.schema, 
            schema.options
        );
        await model.sync();
        return model;
    }

    async create(item) {
        if (item) {
            const { dataValues } = await this._schema.create(item);
            return dataValues;
        } else {
            throw new Error("CANT CREATE A VEHICLE: no vehicle informed", item);
        }
    }

    async get(query) {
        return await this._schema.findAll({ raw: true, where: query });
    }

    async update(item, query) {
        if (query) {
            return await this._schema.update(item, { where: query });
        } else {
            throw new Error("CANT UPDATE ITEM: no query is informed ", query);
        }
    }

    async delete(query) {
        if (query) {
            return await this._schema.destroy({ where: query });
        } else {
            throw new Error("CANT REMOVE ITEM: no query is informed ", query);
        }
    }

    async report(query = null, page = 1, itemsPerPage = 20) {
        if (page <= 0) page = 1; // theres no negative pages
        page = page - 1; // our pagination start in 0 (to sql)      

        // if itemsPerPage == 0, so the client wants it all
        if (itemsPerPage === 0) {
            itemsPerPage = -1;
            page = 0;
        }

        // if we have a query, filter all table and filter result afterwards
        let originalItemsPerPage = null;
        let originalPage = null;
        if (query !== null) {
            originalItemsPerPage = itemsPerPage;
            itemsPerPage = -1;
            originalPage = page;
            page = 0;
        }

        // set empty query if not informed
        if (query === null)
            query = {};

        // if we have a limit
        let limits = {};
        if (itemsPerPage !== -1) {
            limits = {
                limit: itemsPerPage
            }
        }

        // selecting from postgre
        let result = await this._schema.findAll({ 
            raw: true, 
            ...limits,
            offset: (page * itemsPerPage),
            where: query 
        });

        // if we got all records from table, lets paginate it
        if (originalItemsPerPage !== null) {
            itemsPerPage = originalItemsPerPage;
            page = originalPage;

            if (itemsPerPage !== -1) { // only if client dont ask for all
                let start = (page * itemsPerPage);
                let end = start + itemsPerPage;
                result = result.slice(start, end);
            }
        }

        return result;
    }    
}

module.exports = MariaDB;