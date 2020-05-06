const Mongoose = require('mongoose');

// connecting to mongoose (mongodb)
Mongoose.connect("mongodb://root:123456@localhost:27017/heroes", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (error) {
    if (!error) return;

    console.log("Cant connect to mongo: ", error);
});

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
const heroModel = Mongoose.model('c_heroes', heroSchema);

// starting connection
const connection = Mongoose.connection;
connection.once('open', async () => {
    const state = connection.readyState;    
    console.log("mongodb connected: ", state);

    // inserting hero
    const resultInsert = await heroModel.create({
        name: 'mankind',
        power: 'adapt'
    });
    console.log("resultInsert: ", resultInsert);

    // reading all
    const findResult = await heroModel.find();
    console.log("findResult: ", findResult);

});

