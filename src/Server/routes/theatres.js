const exprees = require("express");
const router = exprees.Router();
const db_connect = require("../database/database_access");
const session = require("express-session");

router.use(
  session({
    secret: "seCReT",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 },
  })
);
router.use(exprees.json());
router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

db_connect.connect((err) => {
  if (err) console.log(err);
  else console.log("Connected to database");
});

router.post("/login", (req, res) => {
  if (!req.session.theatre) {
    const { theatre_id, password } = req.body;
    console.log(req.body);

    if(theatre_id===""||password==="") res.send({
        authenticated:false,
        err:'None of the field can be empty'
    })
    db_connect.query(`select * from theatres where id=${theatre_id};`,
    (err,result)=>{
        if(err) res.send({
            authenticated:false,
            err:err
        })
        else{
            if(password===result[0].password){
                req.session.authenticated=true;
                res.send({
                    authenticated:true,
                    sessionID:req.sessionID,
                    theatre_name:result[0].theatreName,
                    theatre_id:result[0].ID,
                })
            }
            else res.send({
                authenticated:false,
                err:"Incorrect password"
            })
        }
    })
    // res.send("got it");
  } else res.status(400).send("already logged in");
});
router.get('/logout',(req,res)=>{
  console.log("here")
  if (req.session.authenticated) {
    res.clearCookie("connect.id");
    req.session.destroy(() => {
      console.log("user logged out");
      res.status(200).send("logout success");
    });
  } else {
    console.log("theatre not signed in")
    res.status(400).send("you are not logged in");
  }
})



module.exports = router;
