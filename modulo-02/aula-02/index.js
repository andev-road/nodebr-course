const service = require('./service');

async function main() {
    try {
        const result = await service.getPeople('a');

        const namesForEach = [];
        console.time("forEach");
        result.results.forEach((item) => {
            namesForEach.push(item.name);
        });
        console.timeEnd("forEach");
        console.log("namesForEach: ", namesForEach);

        console.time("map");
        const namesMap = result.results.map((item) => {
            return item.name;
        });
        // or: const namesMap = result.results.map((item) => item.name); 
        console.timeEnd("map");
        console.log("namesMap: ", namesMap);

    } catch (err) {
        console.log("error log: ", err);
    }
}

main();