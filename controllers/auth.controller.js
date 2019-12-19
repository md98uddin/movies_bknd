const router = require("express").Router();
const services = require("../utils/services");
const bcrypt = require("bcrypt");
const User = require("../models/users.model");

router.route("/").post(async (request, response) => {
  const { email, password } = request.body;
  const { error } = services.validateLogin({ email, password });

  if (!error) {
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(400).send("invalid email or password");
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return response.status(400).send("invalid email or password");
      }
      response.status(200).send(true);
    }
  } else {
    response.status(400).send(error.message);
  }
});

module.exports = router;
