use database bookMyTicket;
CREATE TABLE users (
    ID int NOT NULL auto_increment,
    username varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    mobile_no varchar(255) ,
    PRIMARY KEY (ID)
); 
CREATE TABLE theatres(
    ID int NOT NULL auto_increment,
    theatre_name varchar(255) NOT NULL;
    email varchar(255) NOT NULL,
    mobile_no varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY(ID)
)