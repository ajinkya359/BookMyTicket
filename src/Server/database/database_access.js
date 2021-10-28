const mysql=require('mysql');

const db_connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ajinkya5555",
  database:"bookMyTicket"
});

module.exports=db_connect;