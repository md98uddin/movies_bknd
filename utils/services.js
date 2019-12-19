const Joi = require("@hapi/joi");

validateMovie = movie => {
  const Schema = Joi.object().keys({
    title: Joi.string()
      .max(48)
      .required(),
    cover: Joi.string().required(),
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

validateUser = user => {
  const Schema = Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(48)
      .required(),
    email: Joi.string()
      .email()
      .min(5)
      .max(255)
      .required(),
    password: Joi.string()
      .min(6)
      .max(255)
      .required()
  });

  return Schema.validate(user);
};

validateLogin = user => {
  const Schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .min(5)
      .max(255)
      .required(),
    password: Joi.string()
      .min(6)
      .max(255)
      .required()
  });

  return Schema.validate(user);
};

exports.validateMovie = validateMovie;
exports.validateUser = validateUser;
exports.validateLogin = validateLogin;
