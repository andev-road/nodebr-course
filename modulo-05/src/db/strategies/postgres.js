const ICrud = require('./interfaces/interface.crud');

class PSQL extends ICrud {
    constructor() {
        super();
    }

    create(item) {
        console.log('item saved in the psql world');
    }
}

module.exports = PSQL;