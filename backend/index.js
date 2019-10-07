var express = require("express");
const multer = require("multer");
const uuidv4 = require("uuid/v4");
const path = require("path");
var pool = require("./ConnectionPooling.js");
const fs = require("fs");

var usersRouter = require("./routes/users");
var ownerRouter = require("./routes/owners");
var buyerRouter = require("./routes/buyers");

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

app.use("/", usersRouter);
app.use("/", ownerRouter);
app.use("/", buyerRouter);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

app.post("/upload-file", upload.array("photos", 5), (req, res) => {
  console.log("req.body", req.body);
  res.end();
});

//download-file

app.post("/download-file/:file(*)", (req, res) => {
  console.log("Inside Download File");
  var file = req.params.file;
  var filelocation = path.join(__dirname + "/uploads", file);
  var img = fs.readFileSync(filelocation);
  var base64img = new Buffer(img).toString("base64");
  res.writeHead(200, {
    "Content--type": "image/jpg"
  });
  res.end(base64img);
});

module.exports = app;
app.listen(3001);
app.get("/", (req, res) => res.send("Hello World !"));
