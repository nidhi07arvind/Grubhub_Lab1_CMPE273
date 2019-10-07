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
  console.log("Inside delete item from menu POST");
  console.log("Request Body: ", req.body);
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
        var sql =
          "DELETE from item WHERE (item_id) = " +
          mysql.escape(req.body.item_id);

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
            'SELECT * from item where section="Breakfast" AND res_id = ' +
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

app.get("/lunch-details", function(req, res) {
  console.log("Inside Lunch Details GET!");
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

          var sql =
            'SELECT * from item where section="lunch" AND res_id = ' +
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
app.get("/dinner-details", function(req, res) {
  console.log("Inside Dinner Details GET!");
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
            'SELECT * from item where section="dinner" AND res_id = ' +
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

app.post("/update-owner-order", function(req, res) {
  console.log("Inside Update Order POST");
  console.log("Request Body:", req.body);
  console.log("Res_id:", req.body[0].res_id);
  console.log("Req Length: ", req.body.length);

  const res_id = req.body[0].res_id;
  const email = req.body[0].email;
  // const order_id = 101;
  // const res_id = 1;
  // const email = "nidhi@gmail.com";
  pool.getConnection(function(err, conn) {
    if (err) {
      console.log("Error in establishing connection!");
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in establishing connection!");
    } else {
      /*var sql2 =
        "UPDATE orders (status) VALUES(" +
        mysql.escape(status) +
        ");";

      conn.query(sql2, function(err, result) {
        if (err) {
          console.log("Error in adding order");
          res.writeHead(400, {
            "Content-type": "text/plain"
          });
          res.end("Error in adding an order");
        } else {
          console.log("Adding order successful!");
          // res.writeHead(200, {
          //   "Content-type": "text/plain"
          // });
          res.end("Adding order successful!");
        }
      });*/

      for (var index = 0; index < req.body.length; index++) {
        var sql3 =
          "UPDATE orders set " +
          "status = " +
          mysql.escape(req.body[index].status) +
          " WHERE order_id = " +
          mysql.escape(req.body[index].order_id);

        conn.query(sql3, function(err, result) {
          if (err) {
            console.log("Error in updating order");
          } else {
            console.log("Order updated successfully!", index);
            res.end("Order updated successfully!");
          }
        });
      }
    }
  });
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
app.get("/owner-order-details", function(req, res) {
  console.log("Inside Owner Order Details GET!");
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
        "SELECT * from orders as o where o.res_id= (SELECT ow.res_id from owner as ow where ow.owner_id=" +
        mysql.escape(userSession.owner_id) +
        ");";

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
