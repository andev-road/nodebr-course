const { readFile, writeFile } = require('fs'); // using filesystem

// converting readFile to Promise
const { promisify } = require('util');
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

// we could do this as well to read the json file
// const jsonData = require('./heroes.json');

class Database {    
    constructor() {
        this.FILE_NAME = "aula-01/heroes.json";
    }

    async getContentFromFile() {
        // with json files, we could just use "require"
        // but the goal here is to simulate some file control
        // eg: text file, csv, etc...
        const file = await readFileAsync(this.FILE_NAME, 'utf8');
        return (file.toString() !== "") ? JSON.parse(file.toString()) : [];
    }

    async writeContentToFile(data) {
        await writeFileAsync(this.FILE_NAME, JSON.stringify(data));
        return true;
    }

    async get(id) {
        const data = await this.getContentFromFile();
        const filteredData = data.filter(item => (id ? item.id === id : true));
        return filteredData;
    }

    async insert(hero) {
        const databaseData = await this.getContentFromFile();
        const mergedData = [
            ...databaseData, // will merge the objects
            hero
        ];
        const result = await this.writeContentToFile(mergedData);
        return result;
    }

    async remove(id) {
        if (!id)
            return await this.writeContentToFile([]);
        const database = await this.getContentFromFile();
        const index = database.findIndex(item => item.id === parseInt(id));
        if (index === -1) 
            throw Error('this hero id doesnt exists');
        database.splice(index, 1);
        return await this.writeContentToFile(database);
    }

    async update(changes, id) {
        const database = await this.getContentFromFile();
        const index = database.findIndex(item => item.id === parseInt(id));
        if (index === -1) 
            throw Error('this hero id doesnt exists');
        const hero = database[index];
        const updatedHero = {
            ...hero,
            ...changes
        };
        database.splice(index, 1);
        return await this.writeContentToFile([
            ...database,
            updatedHero  
        ]);
    };
}

module.exports = new Database();