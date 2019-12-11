const Joi = require("@hapi/joi");

validateMovie = movie => {
  const Schema = Joi.object().keys({
    title: Joi.string()
      .max(48)
      .required(),
    genre: Joi.string()
      .valid("All", "Horror", "Action", "Adventure", "Sci-Fi", "Mystery")
      .required()
      .default("All"),
    releaseYear: Joi.number()
      .min(new Date().getFullYear())
      .required(),
    duration: Joi.number()
      .max(240)
      .required(),
    rating: Joi.valid("1", "2", "3", "4", "5").required()
  });

  return Schema.validate(movie);
};

exports.validateMovie = validateMovie;
