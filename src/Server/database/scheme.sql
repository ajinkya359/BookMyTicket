use database bookMyTicket;
CREATE TABLE users (
    ID int NOT NULL auto_increment,
    firstName varchar(255) NOT NULL,
    secondName varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY (ID)
); 