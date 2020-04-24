const service = require('./service');

async function main() {
    try {
        const result = await service.getPeople('a');

        console.log("********************************");

        // calculating time using for to iterate
        const namesThroughFor = [];
        console.time('for');
        for (let i = 0; i < result.results.length; i++) {
            const person = result.results[i];
            namesThroughFor.push(person.name);
        }
        console.timeEnd('for');
        console.log("namesThroughFor: ", namesThroughFor);

        console.log("********************************");

        // calculating time using forIn to iterate
        const namesThroughForIn = [];
        console.time('forIn');
        for (let i in result.results) {
            const person = result.results[i];
            namesThroughForIn.push(person.name);
        }
        console.timeEnd('forIn');
        console.log("namesThroughForIn: ", namesThroughForIn);

        console.log("********************************");

        // calculating time using forOf to iterate
        const namesThroughForOf = [];
        console.time('forOf');
        for (let person of result.results) {
            namesThroughForOf.push(person.name);
        }
        console.timeEnd('forOf');
        console.log("namesThroughForOf: ", namesThroughForOf);

    } catch (err) {
        console.log("error log: ", err);
    }
}

main();