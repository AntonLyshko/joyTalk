const express = require("express");
const rawToWav = require("../services/convert");

const routes = express.Router();

routes.get("/", rawToWav);

module.exports = routes;
