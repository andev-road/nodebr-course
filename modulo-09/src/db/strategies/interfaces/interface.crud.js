class NotImplementedException extends Error {
    constructor() {
        super("Not implemented exception");
    }
}

class ICrud {
    create(item) {
        throw new NotImplementedException();
    }

    read(query, page, itemsPerPage) {
        throw new NotImplementedException();
    }

    get(id) {
        throw new NotImplementedException();
    }

    update(id, item) {
        throw new NotImplementedException();
    }

    delete(id) {
        throw new NotImplementedException();
    }

    isConnected() {
        throw new NotImplementedException();
    }

    static connect() {
        throw new NotImplementedException();
    }
}

module.exports = ICrud;