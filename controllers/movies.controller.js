const router = require("express").Router();
const services = require("../utils/services");
const Movie = require("../models/movies.model");

//return all movies in db
router.route("/").get((request, response) => {
  Movie.find()
    .then(res => {
      response.status(200).send(res);
    })
    .catch(error => {
      console.log(error.message);
    });
});

//return movies with id
router.route("/:id").get((request, response) => {
  const movie = Movie.findById(request.params.id)
    .then(res => {
      response.status(200).send(res);
    })
    .catch(error => {
      response.status(400).send("No movies with the given id found.");
    });
});

router.route("/add").post((request, response) => {
  const { title, genre, releaseYear, duration, rating } = request.body;

  const { error, value } = services.validateMovie({
    title,
    genre,
    releaseYear,
    duration,
    rating
  });

  if (error) {
    return response.status(400).send("error " + error.message);
  } else {
    var newMovie = new Movie(value);
    newMovie
      .save()
      .then(() => {
        response.status(200).send("movie " + newMovie);
      })
      .catch(error => {
        console.log(error.message);
      });
  }
});

module.exports = router;
