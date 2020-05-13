const Sequelize = require('sequelize');

const vehicleSchema = {
    name: "vehicles",
    schema: {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        plate: {
            type: Sequelize.STRING,
            required: true
        },
        seats_total: {
            type: Sequelize.INTEGER,
            required: true
        },
        seats_occupied: {
            type: Sequelize.INTEGER
        },
        latitude: {
            type: Sequelize.DECIMAL(10, 0)
        },
        longitude: {
            type: Sequelize.DECIMAL(10, 0)
        },
        last_information: {
            type: Sequelize.DATE
        }
    },
    options: {
        tableName: 'vehicles',
        freezeTableName: false,
        timestamps: false
    }
};

module.exports = vehicleSchema;