1# install docker in the machine
2# download and run postgres image on docker (our database)
3# download and run adminer image as an IDE to use our psql database
4# download and run mongo image on docker (our 2nd database)
5$ download and run mongoclient image as an IDE to use our mongo database
6# create our application database and the user with only read/write rights 

* If the --name doesnt exists in the local machine, docker will go to docker hub and will download the image
* On the parameter "-p", we set "internal:external" port
* To list all the running containers, use: `docker ps`
* To access the container, use: `docker exec -it postgres /bin/bash`

- 2nd step: download and run postgres
```
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
```
docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer
```

- 4th step: download and run mongodb
```
docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=admin \
    -d \
    mongo:4
```

- 5th step: download and run an IDE to use mongodb
```
docker run \
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient
```

- 6th step: create our application database and the user with only read/write rights 
```
docker exec -it mongodb \
    mongo --host localhost -u admin -p admin --authenticationDatabase admin \
    --eval "db.getSiblingDB('heroes').createUser({ user: 'root', pwd: '123456', roles: [{role: 'readWrite', db: 'heroes'}]})"
```

* Our design pattern: STRATEGY
- We have a goal (like, 'insert hero') and we have our options (strategies) (in our case: psql or mongodb). With the STRATEGY design pattern, we have an interface with "our goals" (crud example: create; read; update; delete;). Also, we have our strategies that will extend our interface. Then, we'll extend our interface to our strategy context (that will receive the option [mongodb or psql] and call the respective function - based on our interface goals)
- db/strategies/base: our context (the common part between our strategies)
- db/strategies: our strategies (in our example: mongodb and psql)
- db/strategies/interfaces: our interfaces (our goals, like a crud interface)