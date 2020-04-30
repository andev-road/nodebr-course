const ICrud = require('./interfaces/interface.crud');
const Sequelize = require('sequelize');

class PSQL extends ICrud {

    constructor() {
        super();
        this._driver = null;
        this._heroes = null;
    }

    async _defineModel() {
        this._heroes = this._driver.define('heroes', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
                required: true
            },
            power: {
                type: Sequelize.STRING
            }
        }, {
            tableName: 'TB_HEROES',
            freezeTableName: false,
            timestamps: false
        });
        await this._heroes.sync();
    }

    async connect() {
        this._driver = new Sequelize('heroes', 'root', '123456', {
            host: 'localhost',
            dialect: 'postgres',
            quoteIdentifiers: false,
            operatorsAliases: false
        });
        await this._defineModel();
    }

    async isConnected() {
        try {
            await this._driver.authenticate();
            return true;
        } catch (err) {
            console.log("failed to maintain connection with psql: ", err);
            return false;
        }
    }

    async create(item) {
        if (item) {
            const { dataValues } = await this._heroes.create(item);
            return dataValues;
        } else {
            throw new Error('item is a required parameter');
        }
    }

    async read(query = {}) {
        const result = await this._heroes.findAll({ raw: true, where: query });
        return result;
    }

    async update(id, item) {
        if (id) {
            const result = await this._heroes.update(item, { where: { id: id } });
            return result;
        } else {
            throw new Error("id is a required parameter");
        }
    }

    async delete(id) {
        if (id) {
            const result = await this._heroes.destroy({ where: { id: id }});
            return result;
        } else {
            throw new Error("id is a required parameter");
        }
    }
}

module.exports = PSQL;