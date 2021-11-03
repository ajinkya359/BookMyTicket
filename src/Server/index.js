const express = require("express");
const app = express();
const port = 5000;
const path = require("path");

// app.get('/sign_up',(req,res)=>{

//     res.send("ola")
// })
app.use("/login", require(path.join(__dirname + "/routes/login.js")));
app.use("/register", require(path.join(__dirname + "/routes/register.js")));
app.use('/search_theatres',require(path.join(__dirname+'/routes/search_theatres.js')))

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
