const express = require("express");
const app = express();
const port = 5000;
const path = require("path");


app.use("/users", require(path.join(__dirname + "/routes/users.js")));
app.use('/search_theatres',require(path.join(__dirname+'/routes/search_theatres.js')))

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
