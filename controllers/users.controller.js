const router = require("express").Router();
const services = require("../utils/services");
const bcrypt = require("bcrypt");
const User = require("../models/users.model");

router.route("/").post(async (request, response) => {
  const { name, email, password } = request.body;
  const { error } = services.validateUser({ name, email, password });
  if (!error) {
    const user = await User.findOne({ email });
    if (user) {
      return response.status(400).send("user with this email already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    newUser
      .save()
      .then(() => {
        response.status(200).send(newUser);
      })
      .catch(error => {
        response.status(400).send(error.message);
      });
  } else {
    response.status(400).send(error.message);
  }
});

router.route("/:email").get;

module.exports = router;
