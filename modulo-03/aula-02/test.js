const assert = require('assert');
const { getPeople, URL } = require('./service');

// class about the mocha and tests are in aula-01
// now were gonna talk about the nock package
const nock = require('nock');

describe('Axios and Star Wars API tests', () => {

    before(() => {
        // im gonna console.log the api pattern (original response)
        //      with a json.stringify
        const response = {"count":1,"next":null,"previous":null,
                        "results":[{"name":"R2-D2","height":"96","mass":"32","hair_color":"n/a",
                        "skin_color":"white, blue","eye_color":"red","birth_year":"33BBY",
                        "gender":"n/a","homeworld":"http://swapi.dev/api/planets/8/",
                        "films":["http://swapi.dev/api/films/1/","http://swapi.dev/api/films/2/",
                        "http://swapi.dev/api/films/3/","http://swapi.dev/api/films/4/",
                        "http://swapi.dev/api/films/5/","http://swapi.dev/api/films/6/"],
                        "species":["http://swapi.dev/api/species/2/"],"vehicles":[],"starships":[],
                        "created":"2014-12-10T15:11:50.376000Z","edited":"2014-12-20T21:17:50.311000Z",
                        "url":"http://swapi.dev/api/people/3/"}]};

        // and nock will intercept every request
        // that match those params:
        nock(URL) // this url
        .get('/?search=R2-D2&format=json') // these querystrings
        .reply(200, response); // and nock will return/reply this

        // use nock to do a performance upgrade
        // so we dont need to REALLY REQUEST
        // just for test
    });

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