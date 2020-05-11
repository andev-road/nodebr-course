1# install docker in the machine
2# download and run postgres image on docker (our database)
3# download and run adminer image as an IDE to use our psql database
4# download and run mongo image on docker (our 2nd database)
5$ download and run mongoclient image as an IDE to use our mongo database
6# create our application database and the user with only read/write rights 

* If the --name doesnt exists in the local machine, docker will go to docker hub and will download the image
* On the parameter "-p", we set "internal:external" port
* To list all the running containers, use: `docker ps`
* To list ALL THE CONTAINERS, use: `docker ps -a`
* If you exited and need to rerun a container, just: `docker start {name}`
* To access the container, use: `docker exec -it postgres /bin/bash`

- 2nd step: download and run postgres
```shell
docker run \
    --name postgres \
    -e POSTGRES_USER=root \
    -e POSTGRES_PASSWORD=123456 \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres  
```

- 3rd step: download and run adminer
```shell
docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer
```

- 4th step: download and run mongodb
```shell
docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=admin \
    -d \
    mongo:4
```

- 5th step: download and run an IDE to use mongodb
```shell
docker run \
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient
```

- 6th step: create our application database and the user with only read/write rights 
```shell
docker exec -it mongodb \
    mongo --host localhost -u admin -p admin --authenticationDatabase admin \
    --eval "db.getSiblingDB('heroes').createUser({ user: 'root', pwd: '123456', roles: [{role: 'readWrite', db: 'heroes'}]})"
```

- 7th step: acess the docker with mongodb
```shell
docker exec -it {mongodb_id} mongo -u root -p 123456 --authenticationDatabase heroes
```

* Our design pattern: STRATEGY
- We have a goal (like, 'insert hero') and we have our options (strategies) (in our case: psql or mongodb). With the STRATEGY design pattern, we have an interface with "our goals" (crud example: create; read; update; delete;). Also, we have our strategies that will extend our interface. Then, we'll extend our interface to our strategy context (that will receive the option [mongodb or psql] and call the respective function - based on our interface goals)
- db/strategies/base: our context (the common part between our strategies)
- db/strategies: our strategies (in our example: mongodb and psql)
- db/strategies/interfaces: our interfaces (our goals, like a crud interface)

* How do we connect to postgres using the nodejs?
- ORM: "SEQUELIZE" (npm i sequelize)
- Driver: "pg-hstore" e "ph" (npm i pg-hstore pg)

* How do we use TDD with our strategies?
- Mocha and assert
- So, run: `npm i --save-dev mocha`

* Tips with MongoDB
- `show dbs`: show our databases
- `use {database_name}`: change the database
- `show collections`: show our collections
- `db.{collection_name}.insert( {} )`: create a new object into our collection
- `db.{collection_name}.find()`: select all
- `db.{collection_name}.find().pretty()`: better view to the find command
- `db.{collection_name}.findOne()`: select all
- `db.{collection_name}.count()`: count all
- `db.{collection_name}.find().limit( {quantity} )`: select all with limit X
- `db.{collection_name}.find().sort({ {parameter}: (1/-1) })`: select all order by asc (true) or desc (false)
- `db.{collection_name}.update({ _id: {object_id} }, {item} )`: update the _id with {object_id} with the {item} sent
- `db.{collection_name}.remove( {query} )`: remove all registers of the query from the database
- we can use JS into our mongodb