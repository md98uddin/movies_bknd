const Mongoose = require("mongoose");
require("dotenv").config();

const connectToDb = () => {
  return Mongoose.connect(
    process.env.ATLAS_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => {
      console.log("connected to db");
    }
  );
};

exports.connectToDb = connectToDb;
