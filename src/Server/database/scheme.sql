use bookMyTicket;
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
    theatreName varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    mobile_no varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY(ID)
);
CREATE TABLE movies(
    ID int NOT NULL auto_increment,
    movie_name varchar(255) NOT NULL,
    description varchar(500) NOT NULL,
    image_url varchar(255) NOT NULL ,
    PRIMARY KEY(ID)
);
CREATE TABLE movie_theatre_connect(
    movie_id int NOT NULL,
    theatre_id int NOT NULL,
    number_of_seats int NOT NULL,
    time INT NOT NULL,
    FOREIGN KEY(movie_id) REFERENCES movies(ID)  ON DELETE CASCADE,
    FOREIGN KEY(theatre_id) REFERENCES theatres(ID)  ON DELETE CASCADE,
    PRIMARY KEY(movie_id,theatre_id,time)
);