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
router.post("/", (req, res) => {
  const { id } = req.body;
  // console.log(req.body)
  // console.log(id);
  db_connect.query(
    `select * from movie_theatre_connect where movie_id=${id}`,
    (err, result) => {
      if (err) res.send(err);
      else {
        if (result.length === 0) {
          res.send(JSON.stringify([]));
          return;
        }
        // console.log(result)
        var theatres_id = result.map((e) => e.theatre_id);
        db_connect.query(
          `select id ,theatreName from theatres where ID in (${db_connect.escape(
            theatres_id
          )})`,
          (err, theatre_details) => {
            if (err) res.send(err);
            else {
              var theatre_name_with_time = [];
              // console.log(result);
              // console.log(theatre_details);
              var j = 0;
              for (var i = 0; i < result.length; ) {
                // console.log(result.length)

                var current_theatre = {
                  theatre_id: theatre_details[j].id,
                  theatre_name: theatre_details[j].theatreName,
                };

                var time = [];
                while (
                  i < result.length &&
                  result[i].theatre_id === theatre_details[j].id
                ) {
                  time.push(result[i].time);
                  i++;
                }
                current_theatre.times = time;
                theatre_name_with_time.push(current_theatre);
                j++;
                // console.log(i, j);
              }
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
