const ICrud = require('./../interfaces/interface.crud');

// using mongoose to communicate with mongodb
const Mongoose = require('mongoose');

class MongoDB extends ICrud {

    constructor(connection, schema) {
        super();
        this._schema = schema;
        this._connection = connection;
    }

    isConnected() {
        return (this._connection ? (this._connection.readyState == "1") : false);
    }

    static async connect() {
        // connecting to mongoose (mongodb)
        await Mongoose.connect("mongodb://root:123456@localhost:27017/heroes", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function (error) {
            if (!error) return;
            throw new Error("Cant connect to mongo: ", error);
        });

        // starting connection
        return Mongoose.connection;
    }

    async create(item) {
        return await this._schema.create(item);
    }

    async read(query = {}) {
        const result = await this._schema.find(query);
        return result;
    }

    async update(id, item) {
        if (id) {
            const result = await this._schema.updateOne({ _id: id }, { $set: item });
            return result;
        } else {
            throw new Error("id is a required parameter");
        }
    }

    async delete(id) {
        if (id) {
            const result = await this._schema.deleteOne({ _id: id });
            return result;
        } else {
            throw new Error("id is a required parameter");
        }
    }
}

module.exports = MongoDB;