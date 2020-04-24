const { getPeople } = require('./service');

async function main() {
    try {
        const { results } = await getPeople("a");
        
        const listNames = results.map((person) => person.name);
        // const listNames = [];
        console.log("listNames: ", listNames);

        // sum all heights using our reduce
        const allNames = listNames.reduce((last, actual) => {
            return last.concat(actual) // returns an array
        }, []).join(", "); // ^ so my initial value is an array ^
        console.log("allNames: ", allNames);
        
    } catch (err) {
        console.log("error log: ", err);
    }
}

main();