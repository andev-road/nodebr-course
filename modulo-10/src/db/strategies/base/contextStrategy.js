const ICrud = require("./../interfaces/interface.crud");

class ContextStrategy extends ICrud {
    constructor(strategy) {
        super();
        this._database = strategy;
    }

    create(item) {
        return this._database.create(item);
    }

    read(item, page, itemPerPage) {
        return this._database.read(item, page, itemPerPage);
    }

    get(id) {
        return this._database.get(id);
    }

    update(id, item) {
        return this._database.update(id, item);
    }

    delete(id) {
        return this._database.delete(id);
    }

    login(item) {
        return this._database.login(item);
    }

    isConnected() {
        return this._database.isConnected();
    }

    static connect() {
        return this._database.connect();
    }
}

module.exports = ContextStrategy