const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("../config/keys.js").MONGO_URI;
const expressGraphQL = require("express-graphql");
const models = require("../models/index");
const schema = require("./schema/schema");
const app = express();
const cors = require("cors");

app.use(cors());

if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}

mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.json());

app.use(
  "/graphql",
  expressGraphQL(req => ({
    schema,
    context: {
      token: req.headers.authorization
    },
    graphiql: true
  }))
);

module.exports = app;