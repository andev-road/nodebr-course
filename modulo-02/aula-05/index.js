const { getPeople } = require('./service');

// lets redo the reduce function just 4 fun
Array.prototype.ourReduce = function (callback, initialValue) {
    let finalValue = (typeof initialValue !== undefined ? initialValue : this[0]);
    for (let item of this) {
        finalValue = callback(finalValue, item, this);
    }
    return finalValue;
}

async function main() {
    try {
        const { results } = await getPeople("a");
        
        // const listHeights = results.map((person) => parseFloat(person.height));
        const listHeights = [];
        console.log("listHeights: ", listHeights);

        // sum all heights using reduce
        let totalHeight = 0;
        totalHeight = listHeights.reduce((last, actual) => {
           return last + actual
        }, 0); // initialValue to guarantee that our reduce wont break with empty arrays
        console.log("totalHeight: ", totalHeight);

        // sum all heights using our reduce
        let ourTotalHeight = 0;
        ourTotalHeight = listHeights.ourReduce((last, actual, list) => {
            return last + actual
        }, 0); // initialValue to guarantee that our reduce wont break with empty arrays
        console.log("ourTotalHeight: ", ourTotalHeight);
        
    } catch (err) {
        console.log("error log: ", err);
    }
}

main();