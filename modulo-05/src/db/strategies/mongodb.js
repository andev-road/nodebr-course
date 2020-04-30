const ICrud = require('./interfaces/interface.crud');

class MongoDB extends ICrud {
    constructor() {
        super();
    }

    create(item) {
        console.log('item saved in the mongodb world');
    }
}

module.exports = MongoDB;