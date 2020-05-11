const assert = require('assert');
const PasswordHelper = require('./../helpers/password.helper');

const examplePass = "123456";
const exampleHashedPass = "$2b$04$1Fvj8TXol7KF8z.rg2tI.eYaHZUhIjlJspb44SqjJvtO/tPR5hYRK";

describe('password helper test suit', function () {
    it('should generate hash from string', async () => {
        const result = await PasswordHelper.hashValue(examplePass);
        assert.ok(result.length > 10);
    });

    it('should compare our hashed string with our original string', async () => {
        const result = await PasswordHelper.compareValue(examplePass, exampleHashedPass);
        assert.ok(result);
    });
});