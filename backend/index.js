var express = require("express");

const path = require("path");
var pool = require("./ConnectionPooling.js");

var app = express();

var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");

var mysql = require("mysql");
var bcrypt = require("bcrypt-nodejs");

//set up cors
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//set up session variable

app.use(
  session({
    secret: "cmpe273-grubhub-app",
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 100,
    activeDuration: 5 * 60 * 100
  })
);

app.use(bodyParser.json());

//Allow acceess control headers
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.post("/signup", function(req, res) {
  console.log("Inside Signup POST");
  console.log("Request Body: ", req.body);

  //User creation query

  /*var presql =
    "SELECT ProfileId from userdetails where Username = " +
    mysql.escape(req.body.Email);

  pool.getConnection(function(err, conn) {
    if (err) {
      console.log("Error in creating connection!");
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in creating connection!");
    } else {
      conn.query(presql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-type": "text/plain"
          });
          console.log("Error in adding an user");
          res.end("Error in adding an user");
        } else {
          if (result[0]) {
            var sql = "UPDATE userdetails set Accounttype = 3";
          } else {*/
  //Hashing Password!

  pool.getConnection(function(err, conn) {
    if (err) {
      console.log("Error in creating connection");
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in creating connection!");
    } else {
      const hashedPassword = bcrypt.hashSync(req.body.Password);

      var sql =
        "INSERT into buyer (name, Email, Password, Accounttype) VALUES(" +
        mysql.escape(req.body.FirstName) +
        "," +
        mysql.escape(req.body.Email) +
        "," +
        mysql.escape(hashedPassword) +
        "," +
        mysql.escape(req.body.Accounttype) +
        ");";

      conn.query(sql, function(err, result) {
        if (err) {
          console.log("Error in adding an user");
          res.writeHead(400, {
            "Content-type": "text/plain"
          });
          res.end("Error in adding an user");
        } else {
          console.log("Adding a user successful!");
          res.writeHead(200, {
            "Content-type": "text/plain"
          });
          res.end("Adding a user successful!");
        }
      });
    }
  });
});

app.post("/ownersignup", function(req, res) {
  console.log("Inside Signup POST");
  console.log("Request Body: ", req.body);

  //User creation query

  var res_id = Math.floor(Math.random() * 100);

  var presql =
    "INSERT into restaurant (res_id, res_name, zipcode) VALUES(" +
    mysql.escape(res_id) +
    "," +
    mysql.escape(req.body.RestaurantName) +
    "," +
    mysql.escape(req.body.ZipCode) +
    ");";

  pool.getConnection(function(err, conn) {
    if (err) {
      console.log("Error in creating connection!");
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in creating connection!");
    } else {
      conn.query(presql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-type": "text/plain"
          });
          console.log("Error in adding restaurant");
          res.end("Error in adding restaurant");
        } else {
          console.log("Adding restaurant successful!");
          res.writeHead(200, {
            "Content-type": "text/plain"
          });
          res.end("Adding restaurant successful!");
        }
      });
    }
  });

  /*var sql1 =
        "SELECT res_id from restaurant where res_name = " +
        mysql.escape(req.body.RestaurantName);

      conn.query(sql1, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-type": "text/plain"
          });
          console.log("Error in adding restaurant");
          res.end("Error in adding restaurant");
        } else {*/

  //const resID = result[0];
  var owner_id = Math.floor(Math.random() * 1000);
  const hashedPassword = bcrypt.hashSync(req.body.Password);
  var sql =
    "INSERT into owner (name, owner_id, res_id, email, password, accounttype) VALUES(" +
    mysql.escape(req.body.FirstName) +
    "," +
    mysql.escape(owner_id) +
    "," +
    mysql.escape(res_id) +
    "," +
    mysql.escape(req.body.Email) +
    "," +
    mysql.escape(hashedPassword) +
    "," +
    mysql.escape(req.body.Accounttype) +
    ");";

  pool.getConnection(function(err, conn) {
    if (err) {
      console.log("Error in creating connection!");
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in creating connection!");
    } else {
      conn.query(sql, function(err, result) {
        if (err) {
          console.log("Error in adding an owner");
          res.writeHead(400, {
            "Content-type": "text/plain"
          });
          res.end("Error in adding an owner");
        } else {
          console.log("Adding owner successful!");
          res.writeHead(200, {
            "Content-type": "text/plain"
          });
          res.end("Adding owner successful!");
        }
      });
    }
  });
});

app.post("/additem", function(req, res) {
  console.log("Inside AddItems POST");
  console.log("Request Body: ", req.body);
  const newItem = req.body;
  const userSession = req.session.user;

  if (req.session.user) {
    pool.getConnection(function(err, conn) {
      if (err) {
        console.log("Error in creating connection");
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Erro in creating connection!");
      } else {
        var presql =
          "SELECT r.res_id from restaurant as r inner join owner as o where r.res_id=o.res_id and o.owner_id=" +
          mysql.escape(userSession.owner_id);

        conn.query(presql, function(err, result) {
          if (err) {
            res.writeHead(400, {
              "Content-type": "text/plain"
            });
            console.log("Error in getting restaurant id");
            res.end("Error in getting restaurant id");
          } else {
            const res_id = result[0].res_id;
            console.log("Got restaurant id successful!");
            res.writeHead(200, {
              "Content-type": "text/plain"
            });
            res.end("Got restaurant ID successful!");

            const item_id = Math.floor(Math.random() * 1000);
            var sql =
              "INSERT into item (item_id,res_id,image,item_name,description,price,section) VALUES(" +
              mysql.escape(item_id) +
              "," +
              mysql.escape(res_id) +
              "," +
              mysql.escape(req.body.image) +
              "," +
              mysql.escape(req.body.name) +
              "," +
              mysql.escape(req.body.description) +
              "," +
              mysql.escape(req.body.price) +
              "," +
              mysql.escape(req.body.section) +
              ");";

            conn.query(sql, function(err, result) {
              if (err) {
                res.writeHead(400, {
                  "Content-type": "text/plain"
                });
                console.log("Error in adding items");
                res.end("Error in adding items");
              } else {
                console.log("Item added successfully");
                res.writeHead(200, {
                  "Content-type": "text/plain"
                });
                res.end("Item added successfully!");
              }
            });
          }
        });

        //SELECT r.res_id from restaurant as r inner join owner o where r.res_id=o.res_id and o.owner_id=7
      }
    });
  }
});

app.post("/login", function(req, res) {
  console.log("Inside login POST");
  console.log("Request Body: ", req.body);

  //Query

  pool.getConnection(function(err, conn) {
    if (err) {
      console.log("Error in creating connection!");
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in creating connection!");
    } else {
      if (req.body.Profile === "Buyer") {
        //Login validation query
        var sql =
          "SELECT * from buyer WHERE email = " + mysql.escape(req.body.Email);
        conn.query(sql, function(err, result) {
          if (err) {
            res.writeHead(400, {
              "Content-Type": "text/plain"
            });
            res.end("Invalid Credentials!");
          } else {
            if (
              result.length == 0 ||
              //!bcrypt.compareSync(req.body.Password, result[0].password)
              req.body.Password !== result[0].password
            ) {
              res.writeHead(401, {
                "Content-type": "text/plain"
              });
              console.log("Invalid Credentials!");
              res.end("Invalid Credentials!");
            } else {
              console.log(result);
              res.cookie("cookie", result[0].name, {
                maxAge: 360000,
                httpOnly: false,
                path: "/"
              });
              res.cookie("Accounttype", result[0].accounttype, {
                maxAge: 360000,
                httpOnly: false,
                path: "/"
              });
              req.session.user = result[0];
              res.writeHead(200, {
                "Content-type": "text/plain"
              });
              console.log("Login successful!");
              res.end("Login successful!");
            }
          }
        });
      } else {
        var sql =
          "SELECT * from owner WHERE email = " + mysql.escape(req.body.Email);
        conn.query(sql, function(err, result) {
          if (err) {
            res.writeHead(400, {
              "Content-Type": "text/plain"
            });
            res.end("Invalid Credentials!");
          } else {
            if (
              result.length == 0 ||
              //!bcrypt.compareSync(req.body.Password, result[0].Password)
              req.body.Password !== result[0].password
            ) {
              res.writeHead(401, {
                "Content-type": "text/plain"
              });
              console.log("Invalid Credentials!");
              res.end("Invalid Credentials!");
            } else {
              console.log(result);
              res.cookie("cookie", result[0].Firstname, {
                maxAge: 360000,
                httpOnly: false,
                path: "/"
              });
              res.cookie("Accounttype", result[0].Accounttype, {
                maxAge: 360000,
                httpOnly: false,
                path: "/"
              });
              req.session.user = result[0];
              res.writeHead(200, {
                "Content-type": "text/plain"
              });
              console.log("Login successful!");
              res.end("Login successful!");
            }
          }
        });
      }
    }
  });
});

app.get("/owner-dashboard-details", function(req, res) {
  console.log("Inside Owner Dashboard Details GET!");
  const userSession = req.session.user;

  pool.getConnection(function(err, conn) {
    if (err) {
      console.log("Error in creating connection!");
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in creating connection!");
    } else {
      var presql =
        "SELECT r.res_id from restaurant as r inner join owner as o where r.res_id=o.res_id and o.owner_id=" +
        mysql.escape(userSession.owner_id);

      conn.query(presql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-type": "text/plain"
          });
          console.log("Error in getting restaurant id");
          res.end("Error in getting restaurant id");
        } else {
          const res_id = result[0].res_id;
          console.log(res_id);
          console.log("Got restaurant id successful!");

          //const item_id = Math.floor(Math.random() * 1000);
          var sql = "SELECT * from item where res_id = " + mysql.escape(res_id);

          conn.query(sql, function(err, result) {
            if (err) {
              // res.writeHead(400, {
              //   "Content-type": "text/plain"
              // });
              console.log("Error in getting  items");
              res.json({ data: "Error in getting items" });
            } else {
              console.log("Items in Dashboard loaded successfully");
              console.log(result);
              // res.writeHead(200, {
              //   "Content-type": "application/json"
              // });
              console.log(JSON.stringify(result));
              //res.end({ data: result });

              res.send(200, JSON.stringify(result));
            }
          });
        }
      });
    }
  });
});

app.post("/item-details", function(req, res) {
  console.log("Inside ITEM Details POST!");
  console.log("Request Body:", req.body);
  const userSession = req.session.user;
  if (userSession) {
    pool.getConnection(function(err, conn) {
      if (err) {
        console.log("Error in creating connection!");
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in creating connection!");
      } else {
        var presql =
          "SELECT r.res_id from restaurant as r inner join owner as o where r.res_id=o.res_id and o.owner_id=" +
          mysql.escape(userSession.owner_id);

        conn.query(presql, function(err, result) {
          if (err) {
            res.writeHead(400, {
              "Content-type": "text/plain"
            });
            console.log("Error in getting restaurant id");
            res.end("Error in getting restaurant id");
          } else {
            const res_id = result[0].res_id;
            console.log(res_id);
            console.log("Got restaurant id successful!");
            res.writeHead(200, {
              "Content-type": "text/plain"
            });
            res.end("Got restaurant ID successful!");

            //const item_id = Math.floor(Math.random() * 1000);
            var sql = "SELECT * from item where res_id = " + res_id;

            conn.query(sql, function(err, result) {
              if (err) {
                res.writeHead(400, {
                  "Content-type": "text/plain"
                });
                console.log("Error in getting  items");
                res.end("Error in getting items");
              } else {
                console.log("Items in Dashboard loaded successfully");
                console.log(result);
                res.writeHead(200, {
                  "Content-type": "application/json"
                });
                console.log(JSON.stringify(result[0]));
                res.end(JSON.stringify(result[0]));
              }
            });
          }
        });
      }
    });
  }
});

app.get("/profile-details", function(req, res) {
  console.log("Inside profile GET");
  console.log("Request Body:", req.body);
  const userSession = req.session.user;
  console.log(userSession);

  if (req.session.user) {
    pool.getConnection(function(err, conn) {
      if (err) {
        console.log("Error in establishing connection");
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in establishing connection");
      } else {
        console.log("Established connection");
        if (req.session.user.Accounttype === 1)
          var sql =
            "SELECT * from buyer where email=" +
            mysql.escape(res.session.user.email);
        else
          var sql =
            "SELECT * from owner where owner_id=" +
            mysql.escape(userSession.owner_id);
        //console.log("Profile Details:", req.session.user);
        conn.query(sql, function(err, result) {
          if (err) {
            console.log("Error in retrieving Profile Details");
            res.writeHead(400, {
              "Content-type": "text/plain"
            });
            res.end("Error in retrieving Profile Details");
          } else {
            console.log("Profile Data loaded successfully");
            console.log(result);
            res.writeHead(200, {
              "Content-type": "application/json"
            });
            res.end(JSON.stringify(result[0]));
            console.log(JSON.stringify(result));
          }
        });
      }
    });
  }
});

app.post("/property-details", function(req, res) {
  console.log("Inside Property Details Method POST!");
  console.log("Request Body: ", req.body);

  if (req.session.user) {
    pool.getConnection(function(err, conn) {
      if (err) {
        console.log("Error in creating connection!");
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in creating connection!");
      } else {
        var sql = "SELECT * from item WHERE item_id = " + req.body.item_id;
        conn.query(sql, function(err, result) {
          if (err) {
            console.log("Error in Retrieving property");
            res.writeHead(400, {
              "Content-type": "text/plain"
            });
            res.end("Error in Retrieving property");
          } else {
            res.writeHead(200, {
              "Content-type": "application/json"
            });
            console.log(JSON.stringify(result[0]));
            res.end(JSON.stringify(result[0]));
            conn.release();
          }
        });
      }
    });
  }
});

app.get("/update-item", function(req, res) {
  console.log("Inside update-item GET!");
  //console.log(req.body);
  //const userSession = req.session.user;

  //if (req.session.user) {
  pool.getConnection(function(err, conn) {
    if (err) {
      console.log("Error in establishing connection");
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in establishing connection");
    } else {
      console.log("Established connection");
      const id = 825;
      var sql = "SELECT * from item where item_id=" + mysql.escape(id);

      conn.query(sql, function(err, result) {
        if (err) {
          console.log("Error in getting item details");
          res.writeHead(400, {
            "Content-type": "text/plain"
          });
          res.end("Error in getting item details");
        } else {
          console.log("Data loaded successfully");
          console.log(result);

          res.writeHead(200, {
            "Content-type": "application/json"
          });
          res.end(JSON.stringify(result[0]));
          console.log(JSON.stringify(result));
        }
      });
    }
  });
  // }
});

app.post("/update-item", function(req, res) {
  console.log("Inside UPDATE ITEM POST");
  console.log("Request Body:", req.body);
  const userSession = req.session.user;

  if (req.session.user) {
    pool.getConnection(function(err, conn) {
      if (err) {
        console.log("Error in creating connection");
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in creating connection!");
      } else {
        var sql =
          "UPDATE item set" +
          "item_name=" +
          mysql.escape(req.body.item_name) +
          "," +
          "description=" +
          mysql.escape(req.body.description) +
          "," +
          "price=" +
          mysql.escape(req.body.price) +
          "," +
          "section=" +
          mysql.escape(req.body.section) +
          "WHERE item_id=" +
          mysql.escape(825);

        conn.query(sql, function(err, result) {
          if (err) {
            console.log("Error in updating items");
            res.writeHead(400, {
              "Content-type": "teext/plain"
            });
            res.end("Error in updating items");
          } else {
            console.log("Update Success");
            result.writeHead(200, {
              "Content-type": "application.json"
            });
            res.end("Updated!");
          }
        });
      }
    });
  }
});

app.post("/search", function(req, res) {
  console.log("Inside SEARCH POST!");
  console.log("Request Body:", req.body);

  const userSession = req.session.user;

  if (req.session.user) {
    pool.getConnection(function(err, conn) {
      if (err) {
        console.log("Error in establishing connection!");
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in establishing connection!");
      } else {
        console.log("Connection established successfully");
        console.log("Request search text:", req.body.searchText);
        const iname = req.body.searchText;
        //var sql = "SELECT * from item where item_name LIKE ?";

        conn.query(
          "SELECT * from item where item_name LIKE?",
          "%" + iname + "%",
          function(err, result) {
            if (err) {
              console.log("Error in searching items!");
              res.json({ data: "Error in gettings items" });
            } else {
              console.log("Items loaded successfully");
              console.log(result);
              console.log(JSON.stringify(result));
              res.status(200).send(JSON.stringify(result));
            }
          }
        );
      }
    });
  }
});

app.post("/restaurant-display", function(req, res) {
  console.log("Inside Restaurant Details POST!");
  console.log(req.body);

  if (req.session.user) {
    pool.getConnection(function(err, conn) {
      if (err) {
        console.log("Error in establishing connection");
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in establishing connection");
      } else {
        console.log("Connection Established");
        console.log("Request body:", req.body.res_id);
        const cuisine = "italian";
        //var sql = "SELECT * from item where cuisine =" + mysql.escape(cuisine);
        var sql =
          "SELECT * from item where res_id =" + mysql.escape(req.body.res_id);
        conn.query(sql, function(err, result) {
          if (err) {
            console.log("Error in searching items!");
            res.json({ data: "Error in gettings items" });
          } else {
            console.log("Items loaded successfully");
            console.log(result);
            console.log(JSON.stringify(result));
            res.status(200).send(JSON.stringify(result));
          }
        });
      }
    });
  }
});

module.exports = app;
app.listen(3001);
app.get("/", (req, res) => res.send("Hello World!"));
