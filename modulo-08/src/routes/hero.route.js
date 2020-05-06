const Joi = require('joi');
const Boom = require('boom');

const BaseRoute = require('./base/base.route');

const failAction = (request, header, error) => {
    throw error;
};

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
                    failAction,
                    query: {
                        page: Joi.number().integer().default(1),
                        pageSize: Joi.number().integer().default(20),
                        name: Joi.string().min(2).max(100)
                    }
                }
            },
            handler: async (request, headers) => {
                try {
                    const { page, pageSize, name } = request.query;
                    let query = null;
                    if (name) query = {...query, name};
                    return await this.database.read(query, page, pageSize);
                } catch (err) {
                    console.log("GET /heroes error: ", err);
                    return Boom.internal();
                }
            }
        }
    }

    create() {
        return {
            path: '/heroes',
            method: 'POST',
            config: {
                validate: {
                    failAction,
                    payload: {
                        name: Joi.string().min(2).max(100).required(),
                        power: Joi.string().max(100).required()
                    }
                }
            },
            handler: async (request, headers) => {
                try {
                    const heroData = request.payload;
                    return await this.database.create(heroData);
                } catch (err) {
                    console.log("POST /heroes error: ", err);
                    return Boom.internal();
                }
            }
        };
    }

    updateCompletely() {
        return {
            path: '/heroes/{id}',
            method: 'PUT',
            config: {
                validate: {
                    failAction,
                    params: {
                        id: Joi.number().integer().required()
                    },
                    payload: {
                        name: Joi.string().min(2).max(100).required(),
                        power: Joi.string().max(100).required()
                    }
                }
            },
            handler: async (request, headers) => {
                try {
                    const { id } = request.params;
                    const heroData = request.payload;
                    return await this.database.update(id, heroData);
                } catch (err) {
                    console.log("PUT /heroes error: ", err);
                    return Boom.internal();
                }
            }
        };
    }

    patch() {
        return {
            path: '/heroes/{id}',
            method: 'PATCH',
            config: {
                validate: {
                    failAction,
                    params: {
                        id: Joi.number().integer().required()
                    }
                }
            },
            handler: async (request, headers) => {
                try {
                    const { id } = request.params;
                    const heroData = request.payload;
                    return await this.database.update(id, heroData);
                } catch (err) {
                    console.log("PATCH /heroes error: ", err);
                    return Boom.internal();
                }
            }
        };
    }

    delete() {
        return {
            path: '/heroes/{id}',
            method: 'DELETE',
            config: {
                validate: {
                    failAction,
                    params: {
                        id: Joi.number().integer().required()
                    }
                }
            },
            handler: async (request, headers) => {
                try {
                    const { id } = request.params;
                    return await this.database.delete(id);
                } catch (err) {
                    console.log("DELETE /heroes error: ", err);
                    return Boom.internal();
                }
            }
        };
    }

}

module.exports = HeroRoutes;