const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/public", express.static(process.cwd() + "/public"));
app.set("view engine", "ejs");

app.use("/", routes);

module.exports = app;
