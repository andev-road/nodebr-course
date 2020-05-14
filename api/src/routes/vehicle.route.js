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
                    const teste = teste.api;
                    return await this._database.create(request.payload);
                } catch (err) {
                    console.log('POST /vehicles error: ', err);
                    return Boom.internal();
                }
            }
        };
    }
}

module.exports = VehicleRoute;