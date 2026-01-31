const express = require("express");
const {
  handleAll,
  handleContact,
  handleFeedback,
} = require("../Controllers/userControllers");

const routes = express.Router();

routes.get("/", handleAll);

routes.post("/contact", handleContact);

routes.post("/feedback", handleFeedback);

module.exports = routes;