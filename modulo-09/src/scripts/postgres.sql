DROP TABLE IF EXISTS TB_HEROES;
CREATE TABLE TB_HEROES (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NAME TEXT NOT NULL,
    POWER TEXT
);

INSERT INTO TB_HEROES (NAME, POWER)
VALUES
    ('iron man', 'being iron man'),
    ('flash', 'speed n stuff'),
    ('spiderman', 'spidey things');

