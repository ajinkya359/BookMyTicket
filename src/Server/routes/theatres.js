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

router.post("/add_movie", (req, res) => {
  if (req.session.authenticated) {
    const { theatre_id, movie_id, date, time } = req.body;
    if (theatre_id === "" || movie_id === "" || date === "" || time === "") {
      res.status(404).send("Enter valid input");
      return;
    }
    console.log(req.body);
    var unixtime = Date.parse(`${date} ${time}`) / 1000;
    console.log(unixtime);
    db_connect.query(
      `select * from movie_theatre_connect where theatre_id=${theatre_id} and movie_id=${movie_id} and time=${unixtime};  `,
      (err, result) => {
        if (err) {
          console.log(err);

          res.status(404).send(err);
        } else if (result.length !== 0) {
          res
            .status(404)
            .send(
              "Same Movie in same theatre and at same time is already present"
            );
            console.log("Same Movie in same theatre and at same time is already present")
        } else {
          db_connect.query(
            `insert into movie_theatre_connect(theatre_id,movie_id,time) values(${theatre_id},${movie_id},${unixtime});`,
            (err, result) => {
              if (err) {
                res.status(404).send(err);
                console.log(err);
              } else {
                res.status(200).send("Movie added");
              }
            }
          );
        }
      }
    );
    // res.send("add movie backend")
  } else res.status(404).send("Theatre must be signed in first");
});

router.post("/login", (req, res) => {
  if (!req.session.authenticated) {
    const { theatre_id, password } = req.body;
    console.log(req.body);

    if (theatre_id === "" || password === "")
      res.send({
        authenticated: false,
        err: "None of the field can be empty",
      });
    db_connect.query(
      `select * from theatres where id=${theatre_id};`,
      (err, result) => {
        if (err)
          res.send({
            authenticated: false,
            err: err,
          });
        else {
          if (password === result[0].password) {
            req.session.authenticated = true;
            res.send({
              authenticated: true,
              sessionID: req.sessionID,
              theatre_name: result[0].theatreName,
              theatre_id: result[0].ID,
            });
          } else
            res.send({
              authenticated: false,
              err: "Incorrect password",
            });
        }
      }
    );
    // res.send("got it");
  } else res.status(400).send("already logged in");
});
router.get("/logout", (req, res) => {
  console.log("here");
  if (req.session.authenticated) {
    res.clearCookie("connect.id");
    req.session.destroy(() => {
      console.log("user logged out");
      res.status(200).send("logout success");
    });
  } else {
    console.log("theatre not signed in");
    res.status(400).send("you are not logged in");
  }
});

router.get("/", (req, res) => {
  if (req.session.authenticated) {
    const theatre_id = req.query.theatre_id;
    console.log(theatre_id);
    if (theatre_id <= 0) res.send("invalid parameter");
    db_connect.query(
      `select movie_id,time from movie_theatre_connect where theatre_id=${theatre_id}`,
      (err, result) => {
        if (err) {
          res.send({
            status: false,
            err: err,
          });
        } else {
          if (result.length === 0) {
            res.send(JSON.stringify([]));
            return;
          }
          console.log(result);
          const mapped = result.map((e) => e.movie_id);
          db_connect.query(
            `select movie_name,ID from movies where ID in (${db_connect.escape(
              mapped
            )})`,
            (err, result1) => {
              if (err) {
                res.send({
                  status: false,
                  err: err,
                });
              } else {
                console.log(result1);
                var final_result = [];
                var i = 0;
                result.forEach((element) => {
                  if (element.movie_id !== result1[i].ID) i++;
                  var temp = {
                    movie_name: result1[i].movie_name,
                    ID: element.movie_id,
                    time: element.time,
                  };
                  final_result.push(temp);
                });
                console.log("Final Result", final_result);
                res.send(JSON.stringify(final_result));
              }
            }
          );
        }
      }
    );
    // res.send("ola")
  } else res.status(200).send("Theatre signin first");
});

router.post("/delete_movie", (req, res) => {
  const { movie_id, theatre_id, time } = req.body;
  console.log(req.body);
  console.log(req.body);
  db_connect.query(
    `delete from movie_theatre_connect where movie_id=${movie_id} and theatre_id=${theatre_id} and time=${time}`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          status: false,
          err: err,
        });
      } else {
        res.send({
          status: true,
        });
        console.log("deleted", result);
      }
    }
  );
  // res.send("hello")
});

router.post("/add_this_movie_to_movies_database", (req, res) => {
  const { movie_id, movie_name } = req.body;
  db_connect.query(
    `select * from movies where ID=${movie_id}`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(404).send(err);
      } else if (result.length !== 0) {
        console.log("Movie with same id already exists");
        res.status(404).send("Movie with same id already exists");
      } else {
        db_connect.query(
          `insert into movies(ID,movie_name,description,image_url) values(${movie_id},"${movie_name}","bruh","bruh")`,
          (err, result) => {
            if (err) {
              console.log(err);
              res.status(404).send(err);
            } else {
              res.status(200).send("Movie added to the database.");
            }
          }
        );
      }
    }
  );
});
router.post("/added_or_not", (req, res) => {
  const { movie_id } = req.body;
  console.log(req.body);
  if (movie_id === "") {
    res.status(200).send(JSON.stringify({ registered: true }));
    return
  }
  db_connect.query(
    `select * from movies where ID=${movie_id}`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(404).send(err);
      } else if (result.length === 0) {
        res.status(200).send(JSON.stringify({ registered: false }));
      } else {
        res.status(200).send(JSON.stringify({ registered: true }));
      }
    }
  );
});

router.post("/register", (req, res) => {
  console.log("ols");
  if (!req.session.authenticated) {
    const { userName, email, password, mobileNo } = req.body;

    db_connect.query(
      `select * from theatres where email="${email}"`,
      (err, result) => {
        if (err){
          res.send({
            registered: false,
            err: err,
          });
          console.log({
            registered: false,
            err: err,
          });
        }else {
          if (result.length === 0) {
            db_connect.query(
              `insert into theatres(theatreName,email,password,mobile_no) values("${userName}","${email}","${password}","${mobileNo}")`,
              (err, result) => {
                console.log("ola",result);
                if (err) {
                  res.send({
                    registered: false,
                    err: err,
                  });
                  console.log(err);
                } else {
                  res.send({
                    registered: true,
                    theatre_id:result.insertId
                  });
                  console.log("registered");
                }
              }
            );
          } else {
            res.send({
              registered: false,
              err: "User already registered",
            });
            console.log({
              registered: false,
              err: "User already registered",
            });
          }
        }
      }
    );
  } else res.status(401).send("Not possible as you are logged in already");
});

module.exports = router;
