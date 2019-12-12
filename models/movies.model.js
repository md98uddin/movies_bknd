const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const MovieSchema = new Schema(
  {
    title: { type: String, required: true, maxlength: 48 },
    cover: { type: String, required: true },
    genre: {
      type: String,
      enum: ["All", "Horror", "Action", "Adventure", "Sci-Fi", "Mystery"],
      default: "All",
      required: true
    },
    releaseYear: {
      type: Number,
      required: true,
      min: new Date().getFullYear()
    },
    duration: { type: Number, required: true, max: 240 },
    rating: {
      type: String,
      enum: ["1", "2", "3", "4", "5"],
      default: "1",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Movie = Mongoose.model("Movies", MovieSchema);

module.exports = Movie;
