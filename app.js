const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const homeRoutes = require("./routers/home");

const app = express();
const port = process.env.port || 8080;

mongoose.connect("mongodb://localhost:27017/studentdetails", {
  useNewUrlParser: true,
});
const db = mongoose.connection;

db.on("error", () => {
  console.log("error");
});
db.once("open", () => {
  console.log("connection succesful");
});

app.set("view engine", "ejs");
app.use(express.static("public"));

// body parser
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/", homeRoutes);

app.listen(port);
