const ICrud = require('./interfaces/interface.crud');

// using mongoose to communicate with mongodb
const Mongoose = require('mongoose');

class MongoDB extends ICrud {

    constructor() {
        super();
        this._heroes = null;
        this._driver = null;
    }

    isConnected() {
        return (this._driver ? (this._driver.readyState == "1") : false);
    }

    async connect() {
        // connecting to mongoose (mongodb)
        await Mongoose.connect("mongodb://root:123456@localhost:27017/heroes", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function (error) {
            if (!error) return;
            throw new Error("Cant connect to mongo: ", error);
        });

        // starting connection
        this._driver = Mongoose.connection;
        this._defineModel();
    }

    _defineModel() {
        // creating our schema to collection hero
        const heroSchema = new Mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            power: {
                type: String
            },
            insertedAt: {
                type: Date,
                default: new Date()
            }
        });

        // using our schema in our collection
        this._heroes = Mongoose.model('c_heroes', heroSchema);
    }

    async create(item) {
        return await this._heroes.create(item);
    }

    async read(query = {}) {
        const result = await this._heroes.find(query);
        return result;
    }

    async update(id, item) {
        if (id) {
            const result = await this._heroes.updateOne({ _id: id }, { $set: item });
            return result;
        } else {
            throw new Error("id is a required parameter");
        }
    }

    async delete(id) {
        if (id) {
            const result = await this._heroes.deleteOne({ _id: id });
            return result;
        } else {
            throw new Error("id is a required parameter");
        }
    }
}

module.exports = MongoDB;