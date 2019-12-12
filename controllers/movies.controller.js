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
      response.status(404).send(error.message);
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

router.route("/add").post(async (request, response) => {
  const { title, cover, genre, releaseYear, duration, rating } = request.body;

  const movieExists = await Movie.find({ title });
  if (movieExists.length > 0) {
    return response
      .status(400)
      .send(`movie with the title ${title} already exists`);
  } else {
    const { error, value } = services.validateMovie({
      title,
      cover,
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
          response.status(404).send(error.message);
        });
    }
  }
});

module.exports = router;
