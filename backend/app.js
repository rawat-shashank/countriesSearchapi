const express = require("express");
const bodyParser = require("body-parser");
const env = require("./env");

// Express setup
const app = express();
app.use(bodyParser.json());

// API Header for CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  next();
});

// Express routes

/**
 * Note: seacrh countries in given dataset using keyword, given priorites as below
 * first search if country startswith given keyword.
 * second check if search data is less than limit, search more countries that may contain the given keyword.
 * default limit is set to 10
 * @api {get} searchCountries/:keyword
 * @apiVersion 1.0.0
 * @apiPermission none
 * @apiParam (Request url) {String} keyword search keyword for country name
 *
 * Exceptions
 * - if the dataset is missing.
 * - if the user is not passing any keyword for search
 * - if any other failure in backend logic.
 **/

app.get("/searchCountries/:keyword?", (req, res) => {
  try {
    const countries = require("./config/dataset");
    let { keyword = null } = req.params;
    let envLimit = env.LIMIT ? env.LIMIT : 10;

    if (keyword) {
      keyword = keyword.toLowerCase();
    } else {
      res.status(400).json({
        message: "search keyword required.",
      });
    }

    // to give more precedence for startswith, so user can relate on what he is searching for
    let resp = countries.filter((el) =>
      el.name.toLowerCase().startsWith(keyword)
    );

    // to get other matches as well.
    if (resp.length < envLimit) {
      const resp1 = countries.filter(
        (el) =>
          !el.name.toLowerCase().startsWith(keyword) &&
          el.name.toLowerCase().indexOf(keyword) > -1
      );
      resp = [...resp, ...resp1];
    }

    // to limit search result
    resp = resp.slice(0, envLimit);

    if (resp.length) {
      res.json(resp);
    } else {
      res.status(200).json({
        message: "Not Content for given keyword",
      });
    }
  } catch (e) {
    if (e.code === "MODULE_NOT_FOUND") {
      //   to catch exception if the dataset file is missing
      res.status(500).json({
        message: "Dataset unavilable",
      });
    } else {
      res.status(500).json();
    }
  }
});

// default 404 route
app.use((req, res) => {
  res.status(404).json({
    message: "Page Not Found",
  });
});

module.exports = app;
