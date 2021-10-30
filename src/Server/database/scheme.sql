use database bookMyTicket;
CREATE TABLE users (
    ID int NOT NULL auto_increment,
    username varchar(20) NOT NULL,
    email varchar(20) NOT NULL,
    password varchar(20) NOT NULL,
    mobile_no varchar(20) ,
    PRIMARY KEY (ID)
); 