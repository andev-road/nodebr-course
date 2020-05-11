const Joi = require('joi');
const Boom = require('boom');
const Jwt = require('jsonwebtoken');

const PasswordHelper = require('./../helpers/password.helper');
const BaseRoute = require('./base/base.route');

const failAction = (request, header, error) => {
    throw error;
};

class AuthRoute extends BaseRoute {

    constructor(secret, database) {
        super();
        this.secret = secret;
        this.database = database;
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
                        username: Joi.string().min(2).max(100).required(),
                        password: Joi.string().min(3).required()
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { username, password } = request.payload;

                    // check username
                    const [user] = await this.database.read({username});
                    if (!user)
                        return Boom.unauthorized("Username does not exist");
                    
                    // check password
                    const isPassOk = await PasswordHelper.compareValue(password, user.password);
                    if (!isPassOk)
                        return Boom.unauthorized("Password incorrect");

                    // generate jwt
                    const jwt = Jwt.sign(user, this.secret);
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