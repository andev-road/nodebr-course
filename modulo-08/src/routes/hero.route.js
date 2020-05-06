const Joi = require('joi');

const BaseRoute = require('./base/base.route');

class HeroRoutes extends BaseRoute {
    constructor(database) {
        super();
        this.database = database;
    }

    read() {
        return {
            path: '/heroes',
            method: 'GET',
            config: {
                validate: {
                    failAction: (request, header, error) => {
                        throw error;
                    },
                    query: {
                        page: Joi.number().integer().default(1),
                        pageSize: Joi.number().integer().default(20),
                        name: Joi.string().min(2).max(100)
                    }
                }
            },
            handler: (request, headers) => {
                try {
                    const { page, pageSize, name } = request.query;
                    let query = null;
                    if (name) query = {...query, name};
                    return this.database.read(query, page, pageSize);
                } catch (err) {
                    console.log("GET /heroes error: ", err);
                    return "500 Internal server error";
                }
            }
        }
    }
}

module.exports = HeroRoutes;