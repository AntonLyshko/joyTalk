const ConvertRoute = require("./convert.routes");
const express = require("express");
const routes = express.Router();

routes.use("/convert", ConvertRoute);

module.exports = routes;
