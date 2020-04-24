const service = require('./service');

Array.prototype.mapOnlyName = function (callback) {
    const newMappedArray = [];
    for (let item of this) {
        let result = callback(item.name);
        newMappedArray.push(result);
    }
    return newMappedArray;
};

async function main() {
    try {
        const result = await service.getPeople('a');

        console.time("map");
        const namesMap = result.results.map((item) => item.name); 
        console.timeEnd("map");
        console.log("namesMap: ", namesMap);

        console.time("myOwnMap");
        const namesMyOwnMap = result.results.mapOnlyName((item) => item); 
        console.timeEnd("myOwnMap");
        console.log("namesMyOwnMap: ", namesMyOwnMap);

    } catch (err) {
        console.log("error log: ", err);
    }
}

main();