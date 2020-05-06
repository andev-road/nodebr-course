const Mongoose = require('mongoose');

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
module.exports = Mongoose.model('c_heroes', heroSchema);