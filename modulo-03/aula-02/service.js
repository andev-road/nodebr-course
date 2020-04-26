const { get } = require('axios');
const URL = 'https://swapi.dev/api/people';

async function getPeople(name) {
    const url = `${URL}/?search=${name}&format=json`;
    const result = await get(url);
    // console.log(JSON.stringify(result.data));
    return result.data.results.map(mapPeople);
}

function mapPeople(origin) {
    return {
        name: origin.name,
        height: origin.height
    };
}

module.exports = { getPeople, URL }