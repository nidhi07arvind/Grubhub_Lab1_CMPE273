const express = require("express");
const pool = require("../ConnectionPooling");
var mysql = require("mysql");
const app = express.Router();
var bcrypt = require("bcrypt");

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
          //"SELECT * from item where item_name LIKE?",
          //"%" + iname + "%",
          "SELECT t1.*,t2.* FROM item t1, restaurant t2 where t1.res_id=t2.res_id AND t1.item_name LIKE?",
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

app.get("/breakfast-details", function(req, res) {
  console.log("Inside Breakfast Details GET!");
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
          const section = "Dinner";
          //const item_id = Math.floor(Math.random() * 1000);
          var sql =
            'SELECT * from item where section="Dinner" AND res_id = ' +
            mysql.escape(res_id);
          // +
          // "and section = " +
          // mysql.escape(section);

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

app.get("/buyer-order", function(req, res) {
  console.log("Inside Buyer Order Details GET!");
  const userSession = req.session.user;
  console.log(req.session.user);

  pool.getConnection(function(err, conn) {
    if (err) {
      console.log("Error in creating connection!");
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in creating connection!");
    } else {
      console.log("Established connection");
      var sql =
        'SELECT * from orders WHERE status<>"completed" AND email= ' +
        mysql.escape(userSession.email);

      conn.query(sql, function(err, result) {
        if (err) {
          console.log("Error in getting order details");

          res.json({ data: "Error in getting order details" });
        } else {
          console.log("Orders loaded successfully");
          console.log(result);
          console.log(JSON.stringify(result));

          res.send(JSON.stringify(result));
        }
      });
    }
  });
});
app.get("/past-order", function(req, res) {
  console.log("Inside Buyer Past Order Details GET!");
  const userSession = req.session.user;
  console.log(req.session.user);

  pool.getConnection(function(err, conn) {
    if (err) {
      console.log("Error in creating connection!");
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in creating connection!");
    } else {
      console.log("Established connection");
      var sql =
        'SELECT * from orders WHERE status ="completed" AND email = ' +
        mysql.escape(userSession.email);

      conn.query(sql, function(err, result) {
        if (err) {
          console.log("Error in getting order details");

          res.json({ data: "Error in getting order details" });
        } else {
          console.log("Orders loaded successfully");
          console.log(result);
          console.log(JSON.stringify(result));

          res.send(JSON.stringify(result));
        }
      });
    }
  });
});

module.exports = app;
