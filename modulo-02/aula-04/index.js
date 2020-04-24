const { getPeople } = require('./service');

// lets redo the filter function jut 4 fun
Array.prototype.myOwnFilter = function (callback) {
    const list = [];
    for (index in this) {
        const item = this[index];
        const result = callback(item, index, this);

        if (!result) continue;

        list.push(item);
    }
    return list;
};

async function main() {
    try {
        const { results } = await getPeople("a");

        // filtering only lars family with default filter
        // const larsFamily = results.filter((item) => {
        //     return (item.name.toLowerCase().indexOf("lars") !== -1);
        // });

        // filtering only lars family with my own filter
        const larsFamily = results.myOwnFilter((item) =>
            item.name.toLowerCase().indexOf("lars") !== -1
        );

        // mapping only names
        const larsNames = larsFamily.map((person) => person.name);

        console.log("larsNames: ", larsNames);
    } catch (err) {
        console.log("error log: ", err);
    }
}

main();