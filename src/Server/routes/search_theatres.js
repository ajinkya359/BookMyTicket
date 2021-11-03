const { json } = require("express");
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
router.get("/", (req, res) => {
  const { id } = req.body;
  // console.log(id)
  db_connect.query(
    `select * from movie_theatre_connect where movie_id=${id}`,
    (err, result) => {
      if (err) res.send(err);
      else {
        // console.log(result)
        var theatres_id = result.map((e) => e.theatre_id);
        db_connect.query(
          `select id ,theatreName from theatres where ID in (${db_connect.escape(
            theatres_id
          )})`,
          (err, theatre_details) => {
            if (err) res.send(err);
            else {
              let i = 0;
              var theatre_name_with_time = [];
              result.forEach((element) => {
                if (element.theatre_id !== theatre_details[i].id) i++;
                var r = {
                  theatre_id: element.theatre_id,
                  theatre_name: theatre_details[i].theatreName,
                  time: element.time,
                };
                // console.log(r)
                theatre_name_with_time.push(r);
              });
              console.log(theatre_name_with_time);
              res.send(JSON.stringify(theatre_name_with_time));
            }
          }
        );
      }
    }
  );
  // res.send("Got you request")
});

module.exports = router;
