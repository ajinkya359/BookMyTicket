const exprees = require("express");
const router = exprees.Router();
const db_connect = require("../database/database_access");
const session = require("express-session");
const { reset } = require("nodemon");

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
  if (!req.session.authenticated) {
    // console.log("got the requrest");
    const { email, password } = req.body;
    db_connect.query(
      `select * from users where email="${email}"`,
      (err, result) => {
        if (err)
          res.send({
            signed_in: false,
            err: err,
          });
        else {
          if (result.length === 0) {
            res.send({
              signed_in: false,
              err: "User not registered",
            });
          } else {
            if (password === result[0].password) {
              req.session.authenticated = true;
              res.send({
                sessionID:req.sessionID,
                user:result[0],
                authenticated: true,
              });
            } else {
              req.session.authenticated = false;
              res.send({
                session: req.session,
                signed_in: false,
                err: "Incorrect password",
              });
            }
          }
        }
      }
    );
  } else res.status(401).send("Not possible as you are logged in already");
});

router.post("/register", (req, res) => {
  console.log("ols")
  if (!req.session.authenticated) {
    const { userName, email, password, mobileNo } = req.body;

    db_connect.query(
      `select * from users where email="${email}"`,
      (err, result) => {
        if (err)
          res.send({
            registered: false,
            err: err,
          });
        else {
          if (result.length === 0) {
            db_connect.query(
              `insert into users(userName,email,password,mobile_no) values("${userName}","${email}","${password}","${mobileNo}")`,
              (err, result) => {
                console.log(result);
                if (err) {
                  res.send({
                    registered: false,
                    err: err,
                  });
                } else {
                  res.send({
                    registered: true,
                  });
                }
              }
            );
          } else {
            res.send({
              registered: false,
              err: "User already registered",
            });
          }
        }
      }
    );
  } else res.status(401).send("Not possible as you are logged in already");
});

router.get("/logout", (req, res) => {
  if (req.session.authenticated) {
    res.clearCookie('connect.id')
    req.session.destroy(() => {
        console.log("user logged out")
      res.status(200).send("logout success");
    });
    
  } else {
    res.status(400).send("you are not logged in");
  }
});

module.exports = router;
