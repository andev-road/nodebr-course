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

    async read(query = null, page = 1, itemsPerPage = 20) {
        if (page <= 0) page = 1; // theres no negative pages
        page = page - 1; // we developers love zero

        // total registers in collection
        const maxRegs = await this._schema.countDocuments();

        // if itemsPerPage == 0, so the client wants it all
        if (itemsPerPage === 0) {
            itemsPerPage = maxRegs;
            page = 0;
        }

        // if we have a query, filter all table
        let originalItemsPerPage = null;
        let originalPage = null;
        if (query !== null) {
            originalItemsPerPage = itemsPerPage;
            itemsPerPage = maxRegs;
            originalPage = page;
            page = 0;
        }

        // set empty query if not informed
        if (query === null)
            query = {};

        // selecting from mongo
        let result = await this._schema.find(query)
                                        .sort('insertedAt')
                                        .skip(page * itemsPerPage)
                                        .limit(itemsPerPage);

        // if we got all records from table, lets paginate it
        if (originalItemsPerPage !== null) {
            itemsPerPage = originalItemsPerPage;
            page = originalPage;
            let start = (page * itemsPerPage);
            let end = start + itemsPerPage;
            result = result.slice(start, end);
        }

        return result;
    }

    async get(id) {
        const [ result ] = await this._schema.find({ _id: id });
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