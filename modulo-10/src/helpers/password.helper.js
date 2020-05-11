const Bcrypt = require('bcrypt');
const { promisify } = require('util');

const hashAsync = promisify(Bcrypt.hash);
const compareAsync = promisify(Bcrypt.compare);

// our bcrypt complexity
const SALT = 3;

class PasswordHelper {
    static async hashValue (value) {
        return await hashAsync(value, SALT);
    }

    static async compareValue(value, hash) {
        return await compareAsync(value, hash);
    }
}

module.exports = PasswordHelper;