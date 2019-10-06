const express = require("express");
const pool = require("../ConnectionPooling");
var mysql = require("mysql");
const app = express.Router();
var bcrypt = require("bcrypt");

//login
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
            //compare hashed passwords
            if (
              result.length == 0 ||
              !bcrypt.compareSync(req.body.Password, result[0].password)
            ) {
              res.writeHead(401, {
                message: "Invalid Credentials"
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
              res.cookie("buyer", 1, {
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
              !bcrypt.compareSync(req.body.Password, result[0].password)
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
              //res.cookie("accounttype", result[0].accounttype, {
              res.cookie("owner", 2, {
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

app.post("/signup", function(req, res) {
  console.log("Inside Signup POST");
  console.log("Request Body: ", req.body);

  pool.getConnection(function(err, conn) {
    if (err) {
      console.log("Error in creating connection");
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in creating connection!");
    } else {
      const hashedPassword = bcrypt.hashSync(req.body.Password, 10);
      //const hashedPassword = req.body.Password;

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
  console.log("Inside Owner Signup POST");
  console.log("Request Body: ", req.body);

  //User creation query

  var res_id = Math.floor(Math.random() * 100);
  console.log(res_id);

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
      // res.writeHead(400, {
      //   "Content-type": "text/plain"
      // });
      res.end("Error in creating connection!");
    } else {
      conn.query(presql, function(err, result) {
        if (err) {
          // res.writeHead(400, {
          //   "Content-type": "text/plain"
          // });
          console.log("Error in adding restaurant");
          res.end("Error in adding restaurant");
        } else {
          console.log("Adding restaurant successful!");
          // res.writeHead(200, {
          //   "Content-type": "text/plain"
          // });
          res.end("Adding restaurant successful!");
        }
      });
    }
  });

  var owner_id = Math.floor(Math.random() * 1000);
  const hashedPassword = bcrypt.hashSync(req.body.Password, 10);
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
          // res.writeHead(200, {
          //   "Content-type": "text/plain"
          // });
          res.end("Adding owner successful!");
        }
      });
    }
  });
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
        if (req.session.user.accounttype === 1)
          var sql =
            "SELECT * from buyer where email=" +
            mysql.escape(userSession.email);
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

app.post("/update-profile", function(req, res) {
  console.log("Inside Update Profile POST!");
  console.log("Request Body: ", req.body);
  console.log("Req Session:", req.session.user.accounttype);
  console.log("Email:", req.session.user.email);

  if (req.session.user) {
    pool.getConnection(function(err, conn) {
      if (err) {
        console.log("Error in creating connection!");
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in creating connection!");
      } else {
        if (
          req.session.user.accounttype === 1 ||
          req.session.user.accounttype === 3
        ) {
          var sql =
            "UPDATE buyer set " +
            "name = " +
            mysql.escape(req.body.name) +
            "," +
            "email = " +
            mysql.escape(req.body.email) +
            "," +
            "phone = " +
            mysql.escape(req.body.phone) +
            "," +
            "aboutme= " +
            mysql.escape(req.body.aboutme) +
            "," +
            "country = " +
            mysql.escape(req.body.country) +
            "," +
            "city = " +
            mysql.escape(req.body.city) +
            "," +
            "gender = " +
            mysql.escape(req.body.gender) +
            "," +
            "company = " +
            mysql.escape(req.body.company) +
            "," +
            "profileimage = " +
            mysql.escape(req.body.profileimage) +
            " WHERE email = " +
            req.session.user.email;
        } else {
          var sql =
            "UPDATE owner set " +
            "name = " +
            mysql.escape(req.body.name) +
            "," +
            "email = " +
            mysql.escape(req.body.email) +
            "," +
            "phone = " +
            mysql.escape(req.body.phone) +
            "," +
            "aboutme= " +
            mysql.escape(req.body.aboutme) +
            "," +
            "country = " +
            mysql.escape(req.body.country) +
            "," +
            "city = " +
            mysql.escape(req.body.city) +
            "," +
            "gender = " +
            mysql.escape(req.body.gender) +
            "," +
            "company = " +
            mysql.escape(req.body.company) +
            "," +
            "ProfileImage = " +
            mysql.escape(req.body.profileimage) +
            " WHERE owner_id = " +
            req.session.user.owner_id;
        }
        conn.query(sql, function(err, result) {
          if (err) {
            console.log("Error in updating profile data");
            res.writeHead(400, {
              "Content-type": "text/plain"
            });
            res.end("Error in updating profile data");
          } else {
            console.log("Profile data update complete!");
            res.writeHead(200, {
              "Content-type": "text/plain"
            });
            res.end("Profile data update complete!");
          }
        });
      }
    });
  }
});

app.post("/logout", function(req, res) {
  console.log("POST Logout!");
  res.clearCookie("cookie");
  res.clearCookie("owner");
  res.clearCookie("buyer");
  req.session.user = undefined;
  res.writeHead(200, {
    "Content-type": "text/plain"
  });
  res.end("Back to login!");
});

module.exports = app;
