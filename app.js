const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./db");

const createApp = async () => {
  const app = express();

  await db.connect();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use("/public", express.static(process.cwd() + "/public"));
  app.set("view engine", "ejs");

  const routes = require("./routes");
  app.use("/", routes);

  return app;
}

module.exports = createApp;
