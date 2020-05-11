const Joi = require('joi');
const Boom = require('boom');
const Jwt = require('jsonwebtoken');

const BaseRoute = require('./base/base.route');

const failAction = (request, header, error) => {
    throw error;
};

class AuthRoute extends BaseRoute {

    constructor(secret) {
        super();
        this.secret = secret;
    }

    login() {
        return {
            path: '/login',
            method: 'POST',
            config: {
                auth: false,
                tags: ['api'],
                description: 'Authenticate user and return JWT',
                validate: {
                    failAction,
                    payload: {
                        username: Joi.string().min(2).max(100),
                        password: Joi.string().min(3)
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { username, password } = request.payload;
                    if (username.toLowerCase() !== "admin" || password.toLowerCase() !== "123") 
                        return Boom.unauthorized("login or password incorrect");
                        
                    const fakeUserObject = {
                        username,
                        password,
                        id: 1
                    };

                    const jwt = Jwt.sign(fakeUserObject, this.secret);
                    return {
                        token: jwt
                    };
                } catch (err) {
                    console.log("POST /login error: ", err);
                    return Boom.internal();
                }
            }
        }
    }

}

module.exports = AuthRoute;