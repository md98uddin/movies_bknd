const express = require("express");
const cors = require("cors");
const connectToDb = require("./mongoAtlas");

//initiate app, bodyparser and port for use
var app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());
var port = process.env.PORT || 150;

const movieRoutes = require("./controllers/movies.controller");

app.use("/movies", movieRoutes);

connectToDb.connectToDb().then(async () => {
  app.listen(port, () => {
    console.log(`Server started on ${port}`);
  });
});
