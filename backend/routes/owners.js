const express = require("express");
const pool = require("../ConnectionPooling");
var mysql = require("mysql");
const app = express.Router();
var bcrypt = require("bcrypt");

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
                // res.writeHead(200, {
                //   "Content-type": "text/plain"
                // });
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

app.post("/delete-item", function(req, res) {
  console.log("Inside addtocart POST");
  console.log("Request Body: ", req.body);
  //console.log("Request Body: ", req.body.item_id);
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
        // const order_id = Math.floor(Math.random() * 10000);
        // const quantity = 1;
        // const item_id = req.body.item_id;
        // // console.log("Item_ID: ", item_id);
        var sql =
          "DELETE from item WHERE (item_id) = " +
          mysql.escape(req.body.item_id);
        // var sql =
        //   "INSERT into cart (item_id,res_id,email,item_name,quantity,price) VALUES(" +
        //   mysql.escape(req.body.item_id) +
        //   "," +
        //   mysql.escape(req.body.res_id) +
        //   "," +
        //   mysql.escape(req.session.user.email) +
        //   "," +
        //   mysql.escape(req.body.item_name) +
        //   "," +
        //   mysql.escape(quantity) +
        //   "," +
        //   mysql.escape(req.body.price) +
        //   ");";

        conn.query(sql, function(err, result) {
          if (err) {
            console.log("Error in deleting item to cart");
            res.writeHead(400, {
              "Content-type": "text/plain"
            });
            res.end("Error in deleting item to cart");
          } else {
            console.log("Deleted item successful!");
            res.writeHead(200, {
              "Content-type": "text/plain"
            });
            res.end("Deleted item successful!");
          }
        });
      }
    });
  }
});

module.exports = app;
