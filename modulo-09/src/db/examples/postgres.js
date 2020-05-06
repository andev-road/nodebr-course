const Sequelize = require('sequelize');
const driver = new Sequelize('heroes', 'root', '123456', {
    host: 'localhost',
    dialect: 'postgres',
    quoteIdentifiers: false,
    operatorsAliases: false
});

async function main() {

    // driver.define('model name', 'obj table columns', 'obj table conf');
    const Heroes = driver.define('heroes', {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            required: true
        },
        power: {
            type: Sequelize.STRING
        }
    }, {
        tableName: 'TB_HEROES',
        freezeTableName: false,
        timestamps: false
    }); 

    await Heroes.sync();

    const result = await Heroes.findAll({ raw: true });
    console.log("result: ", result);

    const result2 = await Heroes.findAll({ raw: true, attributes: ['name', 'power'] });
    console.log("result 2: ", result2);
}

main();