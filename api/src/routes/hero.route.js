const BaseRoute = require('./base/base.route');

class HeroRoutes extends BaseRoute {
    constructor(database) {
        super();
        this.database = database;
    }

    read() {
        return {
            path: '/heroes',
            method: 'GET',
            handler: (request, headers) => {
                try {
                    const { page, pageSize, name } = request.query;
                    let query = null;
                    if (name) query = {...query, name};
                    return this.database.read(query, page, pageSize);
                } catch (err) {
                    console.log("GET /heroes error: ", err);
                    return "500 Internal server error";
                }
            }
        }
    }
}

module.exports = HeroRoutes;