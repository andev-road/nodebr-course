console.log("hero suite, here we go...");

const Commander = require('commander');
const database = require('./database');
const Hero = require('./hero')

async function main() {

    // initializing the commander (cli library of nodejs)
    Commander
        .version('v1')
        .option('-N, --name [value]', 'Type the hero name')
        .option('-P, --power [value]', 'Type the hero power')
        .option('-Q, --id [value]', 'ID of the hero')
        .option('-I, --insert', 'Insert a new hero')
        .option('-L, --list', 'List all heros')
        .option('-F, --find', 'Find a hero by id (you need to pass the -Q param)')
        .option('-R, --remove', 'Remove a hero by id (you need to pass the -Q param)')
        .option('-U, --update', 'Update a hero by id (you need to pass the -Q param)')
        .parse(process.argv);

    // initializing the class
    const hero = new Hero(Commander);

    try {

        // if user passed the -I command
        if (Commander.insert) {
            const newHero = {
                ...hero,
                id: Math.floor(Math.random() * 90)
            };
            const result = await database.insert(newHero);
            if (!result)
                throw Error('something went wrong when trying to insert');
            console.log('your hero is successfully inserted');
        }

        // if user passed the -L command
        if (Commander.list) {
            const result = await database.get();
            console.log(result);
        }

        // if user passed the -F command
        if (Commander.find) {
            const id = parseInt(hero.id);
            const result = await database.get(id);
            if (result && result.length > 0) {
                console.log(result);
            } else {
                console.log("nothing found with this id");
            }
        }

        // if user passed the -R command
        if (Commander.remove) {
            const id = parseInt(hero.id);
            const result = await database.remove(id);
            if (!result)
                throw Error('something went wrong when trying to remove');
            console.log("Hero removed successfully");
        }

        // if user passed the -U command
        if (Commander.update) {
            const id = parseInt(hero.id);
            const result = await database.update(hero, id);
            if (!result)
                throw Error('something went wrong when trying to update');
            console.log("Hero updated successfully");
        }

    } catch (err) {
        console.error('somethig failed: ', err);
    }
}

main();