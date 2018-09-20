const express = require("express");
const cookieSession = require('cookie-session')
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ secret: "session" }));

app.use("/public", express.static(process.cwd() + "/public"));
app.set("view engine", "ejs");

app.use("/", routes);

module.exports = app;
