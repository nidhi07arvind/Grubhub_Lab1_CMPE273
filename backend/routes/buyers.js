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

app.post("/cuisine-display", function(req, res) {
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
        console.log("Request body:", req.body.cuisine);
        const cuisine = req.body.cuisine;

        // var sql =
        //   "SELECT * from item where cuisine =" + mysql.escape(req.body.cuisine);
        conn.query(
          "SELECT t1.*,t2.* FROM item t1, restaurant t2 where t1.res_id=t2.res_id AND t1.cuisine LIKE?",
          "%" + cuisine + "%",
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

app.post("/addtocart", function(req, res) {
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
        const order_id = Math.floor(Math.random() * 10000);
        const quantity = 1;
        const item_id = req.body.item_id;
        // console.log("Item_ID: ", item_id);
        var sql =
          "INSERT into cart (item_id,res_id,email,item_name,price) VALUES( " +
          mysql.escape(req.body.item_id) +
          "," +
          mysql.escape(req.body.res_id) +
          "," +
          mysql.escape(req.session.user.email) +
          "," +
          mysql.escape(req.body.item_name) +
          "," +
          mysql.escape(req.body.price) +
          ");";
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
            console.log("Error in adding item to cart");
            res.writeHead(400, {
              "Content-type": "text/plain"
            });
            res.end("Error in adding item to cart");
          } else {
            console.log("Adding item to cart successful!");
            res.writeHead(200, {
              "Content-type": "text/plain"
            });
            res.end("Adding a item to cart successful!");
          }
        });
      }
    });
  }
});

app.get("/cart-details", function(req, res) {
  console.log("Inside Cart Details GET!");
  const userSession = req.session.user;
  console.log(req.session.user);

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

      var sql =
        "SELECT * from cart WHERE email= " + mysql.escape(userSession.email);

      conn.query(sql, function(err, result) {
        if (err) {
          console.log("Error in getting item details");

          res.json({ data: "Error in getting cart details" });
        } else {
          console.log("Cart loaded successfully");
          console.log(result);
          console.log(JSON.stringify(result));

          res.send(JSON.stringify(result));
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

app.post("/place-order", function(req, res) {
  console.log("Inside Place Order GET");
  console.log("Request Body:", req.body);
  console.log("Res_id:", req.body[0].res_id);
  console.log("Req Length: ", req.body.length);

  const order_id = Math.floor(Math.random() * 1000);
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
      var sql2 =
        "INSERT into orders (order_id,res_id,email) VALUES(" +
        mysql.escape(order_id) +
        "," +
        mysql.escape(res_id) +
        "," +
        mysql.escape(email) +
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
      });

      for (var index = 0; index < req.body.length; index++) {
        var sql3 =
          "INSERT INTO owner_to_item (order_id,item_id) VALUES(" +
          mysql.escape(order_id) +
          "," +
          mysql.escape(req.body[index].item_id) +
          ");";

        conn.query(sql3, function(err, result) {
          if (err) {
            console.log("Error in adding order");
            // res.writeHead(400, {
            //   "Content-type": "text/plain"
            // });
            // res.json({ data: "Error in getting items" });
          } else {
            console.log("Order placed successfully!", index);
            // res.writeHead(200, {
            //   "Content-type": "text/plain"
            // });
            res.end("Order placed successfully!");
            //res.status(200).send(JSON.stringify(result));
          }
        });

        var sql4 = "DELETE from CART where email= " + mysql.escape(email);
        conn.query(sql4, function(err, result) {
          if (err) {
            console.log("Error in deleting items from cart");
          } else {
            console.log("Cart cleared", index);
            res.end("Cart cleared successfully!");
            //res.status(200).send(JSON.stringify(result));
          }
        });
      }
    }
  });
});

module.exports = app;
