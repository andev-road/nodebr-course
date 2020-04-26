const { get } = require('axios');

const URL = 'https://swapi.dev/api/people';

async function getPeople(name) {
    const url = `${URL}/?search=${name}&format=json`;
    const result = await get(url);

    // foreach item from results array, it will run the mapPeople
    return result.data.results.map(mapPeople);
}

// convert the api pattern to our pattern
function mapPeople(origin) {
    return {
        name: origin.name,
        height: origin.height
    };
}

module.exports = { getPeople }