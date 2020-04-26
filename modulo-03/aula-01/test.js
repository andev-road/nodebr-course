const assert = require('assert');
const { getPeople } = require('./service');

// we need the mocha installed globally (npm i -g mocha)
// and i also added it to the dev project (npm i --save-dev mocha)
// the --save-dev is to just use it at the develop conf
// in the production, the less the better

describe('Axios and Star Wars API tests', () => {

    it('show get r2d2 in our pattern', async () => {
        const expected = [{
            name: 'R2-D2',
            height: '96'
        }];

        const baseName = 'R2-D2';

        const result = await getPeople(baseName);
        assert.deepEqual(result, expected);
    });

});

// to run it, we do "mocha .\aula-01\test.js"
// if test.js is on our npm root, we can just "mocha"
// if it is in root, but renamed, we just "mocha {file}"
// we cant "node {file}" neither "npm run {command}"
//      because "describe" is a function from mocha (not js or node or npm or etc)
// BUT we can set a command with mocha
//      eg: "scripts": { "test": "mocha ./aula-01/test.js" }
// then we can use the command way of life