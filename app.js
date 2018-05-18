const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost/auth-test");
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/public", express.static(process.cwd() + "/public"));
app.set("view engine", "ejs");

app.use("/", routes);

app.listen(port, function() {
    console.log("Server listening on port " + port + "...");
});
