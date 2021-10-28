const exprees = require("express");
const router = exprees.Router();
const db_connect = require("../database/database_access");

router.use(exprees.json());
router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

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

router.post('/user',(req,res)=>{
    const {firstName,lastName,email,password}=req.body;
    db_connect.query(`select * from users where email="${email}"`,(err,result)=>{
        if (err)
          res.send({
            registered: false,
            err: err,
          })
        else{
            if(result.length===0){
                db_connect.query(`insert into users(firstName,secondName,email,password) values("${firstName}","${lastName}","${email}","${password}")`,(err,result)=>{
                    console.log(result)
                    if(err){
                        res.send({
                            registered:false,
                            err:err
                        })
                    }
                    else{
                        res.send({
                            registered:true
                        })
                    }
                })
            }
            else{
                res.send({
                    registered:false,
                    err:"User already registered"
                })
            }
        }
    });
})

module.exports=router