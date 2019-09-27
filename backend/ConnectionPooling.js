var mysql = require("mysql");

var pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "",
  database: "grubhub"
});

module.exports = pool;
