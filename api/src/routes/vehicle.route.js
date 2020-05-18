const Boom = require('boom');
const Joi = require('Joi');
const BaseRoute = require('./base/base.route');

// Joi config for errors in validations
const failAction = (request, header, error) => {
    throw error;
};

class VehicleRoute extends BaseRoute {
    constructor(database) {
        super();
        this._database = database;
    }

    create() {
        return {
            path: '/vehicles',
            method: 'POST',
            config: {
                validate: {
                    failAction,
                    payload: {
                        plate: Joi.string().min(3).max(10).required(),
                        seats_total: Joi.number().required()
                    }
                }
            },
            handler: async (request) => {
                try {
                    return await this._database.create(request.payload);
                } catch (err) {
                    console.log('POST /vehicles error: ', err);
                    return Boom.internal();
                }
            }
        };
    }

    report() {
        return {
            path: '/vehicles',
            method: 'GET',
            config: {
                validate: {
                    failAction,
                    query: {
                        id: Joi.number().min(0),
                        plate: Joi.string().min(3).max(10),
                        seats_total: Joi.number(),
                        page: Joi.number().min(1),
                        itemsPerPage: Joi.number().min(1)
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { 
                        id, 
                        plate, 
                        seats_total,
                        page,
                        itemsPerPage
                    } = request.query;

                    let query = null;
                    if (id) query = {...query, id};
                    if (plate) query = {...query, plate};
                    if (seats_total) query = {...query, seats_total};

                    return await this._database.report(
                        query, 
                        page, 
                        itemsPerPage
                    );
                } catch (err) {
                    console.log('GET /vehicles error: ', err);
                    return Boom.internal();
                }
            }
        }
    }

    get() {
        return {
            path: '/vehicles/{id}',
            method: 'GET',
            config: {
                validate: {
                    failAction,
                    params: {
                        id: Joi.number().required().min(0)
                    }
                },
            },
            handler: async (request) => {
                try {
                    const { id } = request.params;
                    return await this._database.get({ id: id });
                } catch (err) {
                    console.log(`GET /vehicles/${request.params.id} error: `, err);
                    return Boom.internal();
                }
            }
        }
    }

    patch() {
        return {
            path: '/vehicles/{id}',
            method: 'PATCH',
            config: {
                validate: {
                    failAction,
                    params: {
                        id: Joi.number().required().min(0)
                    },
                    payload: {
                        plate: Joi.string().min(3).max(10),
                        seats_total: Joi.number()
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { id } = request.params;
                    const { 
                        plate, 
                        seats_total 
                    } = request.payload;
                    
                    let query = {};
                    if (plate) query = { ...query, plate };
                    if (seats_total) query = { ...query, seats_total };

                    return await this._database.update(query, { id });
                } catch (err) {
                    console.log(`PATCH /vehicles/${request.params.id} error: `, err);
                    return Boom.internal();
                }
            }
        };
    }

    delete() {
        return {
            path: '/vehicles/{id}',
            method: 'DELETE',
            config: {
                validate: {
                    failAction,
                    params: {
                        id: Joi.number().required().min(0)
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { id } = request.params;
                    return await this._database.delete({ id: id });
                } catch (err) {
                    console.log(`PATCH /vehicles/${request.params.id} error: `, err);
                    return Boom.internal();
                }
            }
        };
    }

}

module.exports = VehicleRoute;