# creating our container with mariadb on port 3306 with pass 123456
`docker run --name mariadb -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -d mariadb:latest `
# getting access to the bash
`docker exec -it mariadb bash`

- if anything goes wrong, just:
# docker logs mariadb
# ps: port forward will make our docker run directly in localhost

# SQL scripts:
> `CREATE DATABASE tracker;`
> ```````
CREATE TABLE "vehicles" (
  "id" int(11) NOT NULL AUTO_INCREMENT,
  "plate" varchar(10) COLLATE utf8_bin DEFAULT NULL,
  "seats_total" int(11) DEFAULT NULL,
  "seats_occupied" int(11) DEFAULT NULL,
  "latitude" decimal(10,0) DEFAULT NULL,
  "longitude" decimal(10,0) DEFAULT NULL,
  "last_information" datetime DEFAULT NULL,
  PRIMARY KEY ("id")
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
``````