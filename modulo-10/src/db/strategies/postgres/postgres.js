const ICrud = require('./../interfaces/interface.crud');
const Sequelize = require('sequelize');

class PSQL extends ICrud {

    constructor(connection, schema) {
        super();
        this._connection = connection;
        this._schema = schema;
    }

    async isConnected() {
        try {
            await this._connection.authenticate();
            return true;
        } catch (err) {
            console.log("failed to maintain connection with psql: ", err);
            return false;
        }
    }

    static async connect() {
        const connection = new Sequelize('heroes', 'root', '123456', {
            host: 'localhost',
            dialect: 'postgres',
            quoteIdentifiers: false,
            logging: false
        });
        return connection;
    }

    static async _defineModel(connection, schema) {
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
            throw new Error('item is a required parameter');
        }
    }

    async read(query = null, page = 1, itemsPerPage = 20) {
        if (page <= 0) page = 1; // theres no negative pages
        page = page - 1; // we developers love zero        

        // if itemsPerPage == 0, so the client wants it all
        if (itemsPerPage === 0) {
            itemsPerPage = -1;
            page = 0;
        }

        // if we have a query, filter all table
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

    async get(id) {
        const [result] = await this._schema.findAll({ raw: true, where: { id: id } });
        return result;
    }

    async update(id, item) {
        if (id) {
            const result = await this._schema.update(item, { where: { id: id } });
            return result;
        } else {
            throw new Error("id is a required parameter");
        }
    }

    async delete(id) {
        if (id) {
            const result = await this._schema.destroy({ where: { id: id }});
            return result;
        } else {
            throw new Error("id is a required parameter");
        }
    }

    async login(item) {
        try {
            const { username, password } = item;
            const [result] = await this._schema.findAll({ raw: true, where: { 
                username,
                password 
            }});
            return result;
        } catch (err) {
            throw new Error("insert the required parameters");
        }
    }
}

module.exports = PSQL;