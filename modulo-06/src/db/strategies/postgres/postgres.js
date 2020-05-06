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
            operatorsAliases: false,
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

    async read(query = {}) {
        const result = await this._schema.findAll({ raw: true, where: query });
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
}

module.exports = PSQL;